import { useRef, useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { customFetch } from './utils';

registerAllModules();

const GridData = () => {
    const [data, setData] = useState([]);
    const [header, setHeader] = useState([]);

    const tableData = async () => {
        try {
            const tableDataResponse = await customFetch('data.json');
            setData(tableDataResponse.data);
            const tableHeaderResponse = await customFetch('header.json');
            setHeader(tableHeaderResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        tableData();
    }, []);

    if (header.length > 0) {
        console.log(header);
        return (
            <HotTable
                data={data}
                colHeaders={true}
                rowHeaders={true}
                height='auto'
                nestedHeaders={header}
                licenseKey='non-commercial-and-evaluation'
            ></HotTable>
        );
    }
};

export default GridData;
