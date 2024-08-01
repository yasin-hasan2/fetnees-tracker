import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SectionTitle from "./SectionTitle";
import { useState } from "react";
import moment from "moment/moment";


const Schedule = () => {
    const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
    const [currentTab, setCurrentTab] = useState()
    return ( 
        <div>
            <SectionTitle title={'Gym'} description={'Class Schedule'} />
            <div className="max-w-3xl mx-auto shadow-md border rounded-md p-5">
                <h2 className="text-xl font-bold mb-10">{moment().format("dddd, LL")}</h2>
                <Tabs>
                    <TabList className={`flex flex-wrap justify-center gap-5 cursor-pointer text-xl font-bold `}>
                        {
                            days.map(day => <Tab onClick={()=>setCurrentTab(day)} key={day} className={`${currentTab === day && "text-red-500 border-b-2 border-red-500"}`}>{day}</Tab>)
                        }
                    </TabList>
                    <TabPanel className={"grid grid-cols-2 md:grid-cols-4 items-center gap-5 text-xl mt-10 font-semibold"}>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Gym class</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Yoga class</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Run Practicse</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Cross Fit</div>
                    </TabPanel>
                    <TabPanel className={"grid grid-cols-2 md:grid-cols-4 items-center gap-5 text-xl font-semibold"}>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Gym class 2</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Yoga class 2</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Run Practicse 2</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Cross Fit 2</div>
                    </TabPanel>
                    <TabPanel className={"grid grid-cols-2 md:grid-cols-4 items-center gap-5 text-xl  font-semibold"}>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Gym class 3</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Yoga class 3</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Run Practicse 3</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Cross Fit 3</div>
                    </TabPanel>
                    <TabPanel className={"grid grid-cols-2 md:grid-cols-4 items-center gap-5 text-xl font-semibold"}>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Morning Yoga</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Yoga Parsonisation</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Zumba fiest</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Spint & sweet</div>
                    </TabPanel>
                    <TabPanel className={"grid grid-cols-2 md:grid-cols-4 items-center gap-5 text-xl font-semibold"}>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Morning Yoga 2</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Yoga Parsonisation 2</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Zumba fiest</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Spint & sweet 2</div>
                    </TabPanel>
                    <TabPanel className={"grid grid-cols-2 md:grid-cols-4 items-center gap-5 text-xl font-semibold"}>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Morning Yoga 3</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Yoga Parsonisation 3</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Zumba fiest 3</div>
                        <div className="border shadow-md rounded-md p-10 text-red-500">Spint & sweet 3</div>
                    </TabPanel>
                    <TabPanel className={"grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-5 text-xl font-semibold"}>
                        
                        <div className="border shadow-md rounded-md p-10 text-red-500">No Class !</div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
     );
}
 
export default Schedule;