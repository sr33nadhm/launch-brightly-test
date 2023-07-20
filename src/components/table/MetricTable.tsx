import { Card, CardHeader, Typography, CardBody } from "@material-tailwind/react";
import { observer } from "mobx-react";
import store from "store/metricStore";
import dayjs from 'dayjs';

function MetricTable() {
    const TABLE_HEAD = ["Name", "Description", "Editions", "Time of Screenshot"];

    const TABLE_ROWS = store.allMetrics;
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
                                        {head}{" "}
                                        {/* {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )} */}
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
        </Card>
    )
}

export default observer(MetricTable)