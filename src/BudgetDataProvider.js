function normalizeOnKey(accumulator, row, key) {
  let keyValue = row[key];
  delete row[key];
  let currentValue = accumulator[keyValue] || [];
  currentValue.push(row);
  return {...accumulator, [keyValue]: currentValue };
}

export const budgetData = fetch("https://data.seattle.gov/resource/8u2j-imqx.json?$limit=50000")
    .then(response => response.json())
    .then(data => data.reduce((yearAccumulator, row) => {
        return normalizeOnKey(yearAccumulator, row, "fiscal_year");
    }, {}))
    .then(dataByYear => {
        Object.keys(dataByYear).forEach(service => {
          dataByYear[service] = dataByYear[service].reduce((serviceAccumulator, row) => {
            return normalizeOnKey(serviceAccumulator, row, "service");
          }, {});
        })
        return dataByYear;
    })
    .then(dataByYear => {
        Object.keys(dataByYear).forEach(service => {
          Object.keys(dataByYear[service]).forEach(department => {
            dataByYear[service][department] = dataByYear[service][department].reduce((departmentAccumulator, row) => {
              return normalizeOnKey(departmentAccumulator, row, "department");
            }, {});
          })
        })
        return dataByYear;
    })
    .then(dataByYear => {
        Object.keys(dataByYear).forEach(service => {
          Object.keys(dataByYear[service]).forEach(department => {
            Object.keys(dataByYear[service][department]).forEach(program => {
              dataByYear[service][department][program] = dataByYear[service][department][program].reduce((programAccumulator, row) => {
                return normalizeOnKey(programAccumulator, row, "program");
              }, {});
            })
          })
        })
        return dataByYear;
    });