import { ArrowDownOnSquareStackIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, MoonIcon, SunIcon, TvIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import store from "store/metricStore";
import { Screenshot } from "typez/Metric";
import { screenshotModeMapping } from "util/metricHelper";

function MetricModal() {
    const screenshots = JSON.parse(store.currentMetric.allScreenshots);
    const activeScreenshots: Screenshot[] = [];
    const pendingScreenshots: Screenshot[] = [];

    screenshots.forEach((item: Screenshot) => {
        if (item.timeOfCapture !== null) {
            activeScreenshots.push(item);
        }
        else {
            pendingScreenshots.push(item);
        }
    });

    const getMenuIcon = (mode: string) => {
        switch (mode) {
            case "modeDesktopLight":
                return (
                    <>
                        <ComputerDesktopIcon strokeWidth={2} className="h-4 w-4" />
                        <SunIcon strokeWidth={2} className="h-4 w-4" />
                    </>
                )
            case "modeMobileLight":
                return (
                    <>
                        <DevicePhoneMobileIcon strokeWidth={2} className="h-4 w-4" />
                        <SunIcon strokeWidth={2} className="h-4 w-4" />
                    </>
                )
            case "modeLaptopLight":
                return (
                    <>
                        <TvIcon strokeWidth={2} className="h-4 w-4" />
                        <SunIcon strokeWidth={2} className="h-4 w-4" />
                    </>
                )
            case "modeLaptopDark":
                return (
                    <>
                        <TvIcon strokeWidth={2} className="h-4 w-4" />
                        <MoonIcon strokeWidth={2} className="h-4 w-4" />
                    </>
                )
            case "modeImport":
                return (
                    <ArrowDownOnSquareStackIcon strokeWidth={2} className="h-4 w-4" />
                )
            case "modeMobileDark":
                return (
                    <>
                        <DevicePhoneMobileIcon strokeWidth={2} className="h-4 w-4" />
                        <MoonIcon strokeWidth={2} className="h-4 w-4" />
                    </>
                )
            case "modeDesktopDark":
                return (
                    <>
                        <ComputerDesktopIcon strokeWidth={2} className="h-4 w-4" />
                        <MoonIcon strokeWidth={2} className="h-4 w-4" />
                    </>
                )
            default:
                return <></>
        }
    }

    return (
        <Dialog size="sm" open={store.showModal} handler={store.setShowModal}>
            <DialogHeader className="justify-between border-b-blue-800 border-b-2 pb-1">
                <Typography variant="h5" color="blue-gray">
                    Screenshots Summary
                </Typography>
                <IconButton
                    color="blue-gray"
                    size="sm"
                    variant="text"
                    className="focus-visible:border-none"
                    onClick={() => { store.setShowModal(false) }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </DialogHeader>
            <DialogBody className="pr-2 pt-2">
                <div className="mb-6">
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-medium opacity-70"
                    >
                        Screenshot captured for
                    </Typography>
                    <ul className="mt-1 -ml-2 flex flex-col gap-1">
                        {activeScreenshots.map((screenshot, index) => {
                            return (
                                <MenuItem key={index} className="flex justify-between items-center gap-2 flex-row pl-2">
                                    <Typography color="blue-gray" variant="paragraph">
                                        {screenshotModeMapping[screenshot.mode]}
                                    </Typography>
                                    <Typography color="blue-gray" className="flex flex-row gap-2 text-green-600">
                                        {getMenuIcon(screenshot.mode)}
                                    </Typography>
                                </MenuItem>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-medium opacity-70"
                    >
                        Screenshots pending for
                    </Typography>
                    <ul className="mt-1 -ml-2 flex flex-col gap-1">
                        {pendingScreenshots.map((screenshot, index) => {
                            return (
                                <MenuItem key={index} className="flex justify-between items-center gap-2 flex-row pl-2">
                                    <Typography color="blue-gray" variant="paragraph">
                                        {screenshotModeMapping[screenshot.mode]}
                                    </Typography>
                                    <Typography color="blue-gray" className="flex flex-row gap-2 text-red-600">
                                        {getMenuIcon(screenshot.mode)}
                                    </Typography>
                                </MenuItem>
                            )
                        })}
                    </ul>
                </div>
            </DialogBody>
            <DialogFooter className="justify-end gap-2 border-t border-blue-gray-50">
                <Button variant="filled" size="sm" onClick={() => { store.setShowModal(false) }}>
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default observer(MetricModal)