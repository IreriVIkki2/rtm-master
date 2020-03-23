import { Fragment } from "react";
import HomeHeader from "./HomeHeader";
import HomeWelcome from "./HomeWelcome";
import HomeClients from "./HomeClients";
import HomeServices from "./HomeServices";
import HomePrograms from "./HomePrograms";
import Contact from "../../Contact";

export default () => {
    return (
        <Fragment>
            <HomeHeader />
            <HomeWelcome />
            <HomeClients />
            <HomeServices />
            <HomePrograms />
            <Contact />
        </Fragment>
    );
};
