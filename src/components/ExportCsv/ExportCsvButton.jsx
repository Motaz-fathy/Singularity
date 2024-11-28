import Button from "../Button/Button";
import React, {useContext, useState} from "react";
import {IntlContext} from "../../utility/context/Internationalization";
import {axiosInstance} from "../../network/apis";
import {CSVDownload} from "react-csv";

export function ExportCsvButton({url, filterParams, getCsvFormattedData}) {
    const {messages} = useContext(IntlContext);
    const [isExporting, setIsExporting] = useState(false);
    const [exportPercentage, setExportPercentage] = useState(0);
    const [data, setData] = useState([]);

    async function exportCsv() {
        setIsExporting(true);
        setData([]);
        let page = 1;
        let totalPages = 1;
        let items = [];
        do {
            const percentage = ((page - 1) / totalPages) * 100;
            setExportPercentage(Math.ceil(percentage));
            const res = await axiosInstance.get(url, {
                params: {...filterParams, page, limit: 200}
            });
            if (page === 1) {
                totalPages = res.data.meta.last_page;
            }
            page++;
            items.push(...res.data.data);
        } while (page <= totalPages);

        setExportPercentage(0);
        setIsExporting(false);
        setData(getCsvFormattedData(items));
    }

    return <div className={'d-inline mx-1'}>
        <Button type="button" color={'danger'} onClick={exportCsv}
                label={isExporting ? messages.GENERAL.EXPORT + ` ${exportPercentage} %` : messages.GENERAL.EXPORT}
                disabled={isExporting}/>
        {data.length > 0 && <CSVDownload data={data} target="_self"/>};
    </div>

}