import { Card, CardHeader, Typography, CardBody, Popover, PopoverHandler, PopoverContent, IconButton, Checkbox, Spinner } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, FunnelIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import store from "store/metricStore";
import dayjs from 'dayjs';
import { Metric } from "typez/Metric";

function MetricTable() {
    const TABLE_HEAD = [
        { label: "Name", value: "name" },
        { label: "Description", value: "description" },
        { label: "Editions", value: "editions" },
        { label: "Time of Screenshot", value: "timeOfScreenshot" }
    ];

    const TABLE_ROWS = store.allMetrics;

    const getSortIcon = (sort: string) => {
        switch (sort) {
            case "ASC":
                return <ChevronUpIcon strokeWidth={2} className="h-4 w-4" />
            case 'DESC':
                return <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
            default:
                return <ChevronUpDownIcon strokeWidth={1} className="h-6 w-8" />
        }
    };

    const handleRowClick = (metric: Metric) => {
        store.setCurrentMetric(metric);
        store.setShowModal(true);
    }

    return (
        <Card className="h-full w-auto">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-0 flex items-center gap-6">
                    <div>
                        <PresentationChartBarIcon strokeWidth={1} className="h-8 w-12 text-blue-600" />
                    </div>
                    <div>
                        <Typography variant="h5" className="mt-1 mb-2 font-thin text-gray-600">
                            Metrics Dashboard
                        </Typography>
                        <Typography className="my-1 font-light text-gray-900/50 text-sm">
                            Here are the metrics captured for the past 30 days. You can always change the retention period in your settings. Click on any row to see details.
                        </Typography>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="py-0 px-0">
                {
                    store.processing ?
                        <div className="w-full h-52 flex justify-center items-center">
                            <Spinner className="h-16 w-16 text-blue-500/10" />
                        </div>
                        :
                        <table className="mt-4 w-full min-w-full table-fixed text-left">
                            <thead>
                                <tr className="border-y-blue-800 border-y-2">
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={index}
                                            className={
                                                `border-y border-blue-gray-100 bg-white px-4 py-2 transition-colors hover:bg-blue-gray-50/20 ${head.value}-col`
                                            }
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-medium leading-none"
                                            >
                                                {head.label}{" "}
                                                <span>
                                                    {
                                                        head.value === "editions" &&
                                                        <Popover>
                                                            <PopoverHandler>
                                                                <IconButton variant="text" className="mr-1">
                                                                    <FunnelIcon strokeWidth={2} className="h-4 w-4" />
                                                                </IconButton>
                                                            </PopoverHandler>
                                                            <PopoverContent className="flex flex-col">
                                                                {
                                                                    store.filtersForUI.map(filter =>
                                                                        <Checkbox
                                                                            key={filter}
                                                                            color="blue"
                                                                            label={filter}
                                                                            checked={store.filtering.includes(filter)}
                                                                            onChange={() => store.filterByEdition(filter)}
                                                                        />
                                                                    )
                                                                }
                                                            </PopoverContent>
                                                        </Popover>
                                                    }
                                                    <IconButton variant="text" onClick={() => store.sortByColumn(head.value)}>
                                                        {getSortIcon(store.sorting[head.value])}
                                                    </IconButton>
                                                </span>
                                            </Typography>

                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="opacity-90">
                                {TABLE_ROWS.map((metric, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const rowClass = "cursor-pointer hover:bg-blue-gray-100/60 hover:text-blue-800";
                                    const baseClass = "p-4 min-w-max"
                                    const classes = isLast ? baseClass : baseClass + " border-b border-blue-gray-50";
                                    return (
                                        <tr className={rowClass} key={index} onClick={() => handleRowClick(metric)}>
                                            <td className={classes + " name-col"}>
                                                <Typography variant="small" className="font-normal">
                                                    {metric.name}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography variant="small" className="font-normal">
                                                    {metric.description}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography variant="small" className="font-normal">
                                                    {metric.editions}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography variant="small" className="font-normal">
                                                    {dayjs(metric.timeOfScreenshot).format('hh:mm a - MMM DD, YYYY')}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                }
            </CardBody>
        </Card>
    )
}

export default observer(MetricTable)