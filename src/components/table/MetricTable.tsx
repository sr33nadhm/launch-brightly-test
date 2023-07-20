import { Card, CardHeader, Typography, CardBody, Popover, PopoverHandler, PopoverContent, IconButton, Checkbox } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";
import store from "store/metricStore";
import dayjs from 'dayjs';

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
                return <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
        }
    };

    return (
        <Card className="h-full w-auto">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-0 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Metrics list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all the metrics
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            {
                !store.processing &&
                <CardBody className="py-0 px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={index}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/40 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head.label}{" "}
                                            <span onClick={() => store.sortByColumn(head.value)}>
                                                {getSortIcon(store.sorting[head.value])}
                                            </span>
                                            {
                                                head.value === "editions" &&
                                                <Popover>
                                                    <PopoverHandler onClick={console.log}>
                                                        <IconButton variant="outlined">
                                                            <FunnelIcon strokeWidth={2} className="h-4 w-4" />
                                                        </IconButton>
                                                    </PopoverHandler>
                                                    <PopoverContent className="flex flex-col">
                                                        {
                                                            store.filters.map(filter =>
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
                                        </Typography>

                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ name, description, editions, timeOfScreenshot }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="w-max flex flex-col description-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {description}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {editions}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {dayjs(timeOfScreenshot).format('hh:mm a, DD/MMM/YYYY')}
                                            </Typography>
                                        </td>


                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            }

        </Card>
    )
}

export default observer(MetricTable)