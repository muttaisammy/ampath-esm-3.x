import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { useIptReportByLocation } from './ipt-report.resource';
import { useTranslation } from 'react-i18next';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import { PieChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import options from './options';
import headers from './constants';
import { parcelData } from './functions';
import { TableExpandRow } from '@carbon/react';
import { TableExpandHeader } from '@carbon/react';
import { TableExpandedRow } from '@carbon/react';

function IptTableComponent({ locationUuid, endDate }) {
  const { t } = useTranslation();
  const { reportData } = useIptReportByLocation(locationUuid, endDate);
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    if (Object.keys(reportData).length > 0) {
      const sectionsData = reportData.sectionDefinitions;
      const sectionIndicatorsValues = reportData.result;
      let headers = [];
      const defs = [];
      let sumOfValue = [];
      let locations = [];
      for (let i = 0; i < sectionsData.length; i++) {
        const section = sectionsData[i];
        const created: any = {};
        created.headerName = section.sectionTitle;
        const header = {
          label: section.sectionTitle,
          value: i,
        };
        headers.push(header);
        created.children = [];
        for (let j = 0; j < section.indicators.length; j++) {
          const indicatorDefinition = section.indicators[j].indicator;
          const child: any = {
            headerName: section.indicators[j].label,
            field: section.indicators[j].indicator,
            description: section.indicators[j].description,
            value: [],
            width: 360,
            total: 0,
          };
          sectionIndicatorsValues.forEach((element) => {
            const val: any = {
              location: element['location_uuid'],
              value: '-',
            };
            if (element[indicatorDefinition] || element[indicatorDefinition] === 0) {
              val.value = element[indicatorDefinition];
              sumOfValue.push(val.value);
              locations.push(element['location_uuid']);
            }

            child.value.push(val);
          });
          created.children.push(child);
        }
        defs.push(created);
      }
      setRowData(defs);
    }
  }, [reportData]);

  const { parcel, pie } = parcelData(rowData);

  if (parcel.length > 0 && pie.length > 0)
    return (
      <>
        <Tabs>
          <TabList aria-label="List of tabs" contained>
            <Tab>Dashboard</Tab>
            <Tab>Overview</Tab>
            <Tab>TB Screening/TPT this month</Tab>
            <Tab>Additional Indicators</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="p-1">
                <PieChart data={pie} options={options}></PieChart>
              </div>
            </TabPanel>
            {parcel.map((rows) => (
              <TabPanel>
                <DataTable rows={rows} headers={headers}>
                  {({ rows, headers, getTableProps, getHeaderProps, getRowProps, getExpandedRowProps }) => (
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          <TableExpandHeader aria-label="expand row" />
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <>
                            <TableExpandRow {...getRowProps({ row })}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>{cell.value}</TableCell>
                              ))}
                            </TableExpandRow>
                            <TableExpandedRow colSpan={headers.length + 1} className="demo-expanded-td">
                              <div style={{ background: 'white' }}>
                                <h6>Patient List Here</h6>
                              </div>
                            </TableExpandedRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </DataTable>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </>
    );
}

export default IptTableComponent;
