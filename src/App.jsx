import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { generateAmountOptions } from './utils';

// register Handsontable's modules
registerAllModules();

export const App = () => {
    const hotRef = useRef(null);

    const data = [
        ['Tesla', 2017, 'black', 'black', '30$'],
        ['Nissan', 2018, 'blue', 'blue', '50$'],
        ['Chrysler', 2019, 'yellow', 'black', '90$'],
        ['Volvo', 2020, 'yellow', 'gray', '100$'],
    ];
    let searchFieldKeyupCallback;

    useEffect(() => {
        const hot = hotRef.current.hotInstance;
        const cell = hot.selectCell(2, 3);
        console.log(cell);
        //  add a search input listener
        searchFieldKeyupCallback = function (event) {
            // get the `Search` plugin's instance
            const search = hot.getPlugin('search');
            // use the `Search` plugin's `query()` method
            const queryResult = search.query(event.target.value);

            console.log(queryResult);

            hot.render();
        };
    });

    return (
        <>
            <div className='controls'>
                search by cell number Row number
                <select>{generateAmountOptions(20)}</select>
                Column number
                <select>{generateAmountOptions(20)}</select>
            </div>
            <div className='controls'>
                <input
                    id='search_field'
                    type='search'
                    placeholder='Search'
                    onKeyUp={(...args) => searchFieldKeyupCallback(...args)}
                />
            </div>
            <HotTable
                ref={hotRef}
                data={data}
                colHeaders={true}
                search={true}
                height='auto'
                licenseKey='non-commercial-and-evaluation'
            />
        </>
    );
};
export default App;
