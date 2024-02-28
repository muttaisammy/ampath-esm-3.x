import React from 'react';

import { LocationsComponent } from '../../location/location.component';
import { useFacilityLocation } from '../../location/location.resource';

function IptReportComponent() {
  const { facilitylocations } = useFacilityLocation();

  return (
    <>
      <LocationsComponent facilitylocations={facilitylocations} />
    </>
  );
}

export default IptReportComponent;
