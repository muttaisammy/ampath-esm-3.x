const packageData = (reportData) => {
  const defs = [];
  if (Object.keys(reportData).length > 0) {
    const sectionsData = reportData.sectionDefinitions;
    const sectionIndicatorsValues = reportData.result;
    let headers = [];

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
  }
  return defs;
};
const parcelData = (rowData) => {
  let parcel = [];
  let pie = [];
  for (let h = 1; rowData && h < rowData.length; h++) {
    let rows = [];
    for (let i = 0; i < rowData[h].children.length; i++) {
      rows.push({
        id: i,
        indicator: rowData[h].children[i].headerName,
        count: rowData[h].children[i].value[0].value,
      });

      if (h == 1)
        pie.push({
          group: rowData[1].children[i].headerName,
          value: rowData[1].children[i].value[0].value,
        });
    }
    parcel.push(rows);
  }
  return { parcel, pie };
};
export { packageData, parcelData };
