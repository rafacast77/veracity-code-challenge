import React from 'react'
import CSVReader from 'react-csv-reader';

const Layout = () => {
  const papaparseOptions = {
    header: true, // Interprets the first row as property names
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
  }
  return (
    <div>
      <CSVReader
        onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)}
        parserOptions={papaparseOptions}
        label="Select CSV "
        onError={console.log('Wrong file format')}
        inputStyle={{color: 'red'}}
      />
    </div>
  )
}

export default Layout
