import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Error/ErrorPage";
import Registration from "../Authentication/Registration";
import Login from "../Authentication/Login";
import Gallery from "../Pages/Gellary/Gallery";
import Classes from "../Pages/Classes/Classes";
import ClassesDetails from "../Pages/Classes/ClassesDetails";
import Community from "../Pages/Community/Community";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "../Private/PrivateRoute";
import RecommendedClass from "../Pages/Dashboard/RecommendedClass/RecommendedClass";
import ManageMembers from "../Pages/Dashboard/ManageMembers/ManageMembers";
import AddForum from "../Pages/Dashboard/AddForum/AddForum";
import AddClasses from "../Pages/Dashboard/AddClasses/AddClasses";
import AllSubscriber from "../Pages/Dashboard/AllSubscriber/AllSubscriber";
import AllTrainers from "../Pages/Dashboard/AllTrainers/AllTrainers";
import PaymentPage from "../Pages/Dashboard/PaymentPage/PaymentPage";
import AllTrainer from "../Pages/Dashboard/allTrainer/AllTrainer";
import AppliedTrainer from "../Pages/Dashboard/AppliedTrainer/AppliedTrainer";
import Balance from "../Pages/Dashboard/Balace/Balance";
import ClassSchedule from "../Pages/Dashboard/classSchedule/ClassSchedule";
import TrainerRouter from "../Private/TrainerRouter";
import AdminRouter from "../Private/AdminRoutes";
import TrainersPage from "../Pages/TrainersPage/TrainersPage";
import TrainerDetails from "../Pages/TrainersPage/TrainerDetails";
import BeATrainer from "../Pages/TrainersPage/BeATrainer";
import TrainerBooked from "../Pages/TrainersPage/TrainerBooked";
import ManageSlot from "../Pages/Dashboard/manageSlot/ManageSlot";
import ActivityLog from "../Pages/Dashboard/ActivityLog/ActivityLog";

const Routers = createBrowserRouter([
        {
            path: '/',
            element: <Main/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
               
                {
                    path: '/gallery',
                    element: <Gallery/>
                },
                {
                    path: '/trainers',
                    element: <TrainersPage/>
                },
                {
                    path: '/trainer-booked',
                    element: <PrivateRoute><TrainerBooked/></PrivateRoute>
                },
                {
                    path: '/trainerDetails/:id',
                    element: <TrainerDetails/>,
                    loader: ({params})=> fetch(`https://fitness-tracker-server-tau.vercel.app/trainers/${params.id}`)
                },
                {
                    path: '/be-a-trainer',
                    element: <PrivateRoute><BeATrainer/></PrivateRoute>
                },
                {
                    path: '/classes',
                    element: <Classes/>
                },
                {
                    path: '/classes-details/:id',
                    element: <ClassesDetails/>,
                    loader: ({params})=> fetch(`https://fitness-tracker-server-tau.vercel.app/classes/${params.id}`)
                },
                {
                    path: '/community',
                    element: <Community/>
                },
            ]
        },
        {
            path: '/registration',
            element: <Registration/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        
        {
            path: '/dashboard',
            element: <PrivateRoute><Dashboard/></PrivateRoute>,
            children: [
                // member related
                
                {
                    path: '/dashboard/profile',
                    element:<PrivateRoute><Profile/></PrivateRoute>
                },
                {
                    path: '/dashboard/recommended-class',
                    element: <PrivateRoute><RecommendedClass/></PrivateRoute>
                },
                {
                    path: '/dashboard/class-schedule',
                    element: <PrivateRoute><ClassSchedule/></PrivateRoute>
                },
                {
                    path: '/dashboard/activity-log',
                    element: <PrivateRoute><ActivityLog/></PrivateRoute>
                },
                // trainer related
                {
                    path: '/dashboard/manage-members',
                    element: <PrivateRoute><TrainerRouter><ManageMembers/></TrainerRouter></PrivateRoute>
                },
                {
                    path: '/dashboard/manage-slot',
                    element: <PrivateRoute><TrainerRouter><ManageSlot/></TrainerRouter></PrivateRoute>
                },
                {
                    path:'/dashboard/add-forum',
                    element: <PrivateRoute><AddForum/></PrivateRoute>
                },
                {
                    path: '/dashboard/add-classes',
                    element: <PrivateRoute><TrainerRouter><AddClasses/></TrainerRouter></PrivateRoute>
                },
                // admin related
                {
                    path: '/dashboard/all-subscriber',
                    element: <PrivateRoute><AdminRouter><AllSubscriber/></AdminRouter></PrivateRoute>
                },
                {
                    path: '/dashboard/all-trainers',
                    element: <PrivateRoute><AdminRouter><AllTrainers/></AdminRouter></PrivateRoute>
                },
                {
                    path: '/dashboard/payment-page/:id',
                    element: <PrivateRoute><AdminRouter><PaymentPage/></AdminRouter></PrivateRoute>,
                    loader: ({params})=> fetch(`https://fitness-tracker-server-tau.vercel.app/trainers/${params.id}`)
                },
                {
                    path: '/dashboard/all-trainer',
                    element: <PrivateRoute><AdminRouter><AllTrainer/></AdminRouter></PrivateRoute>
                },
                {
                    path: '/dashboard/applied-trainers',
                    element: <PrivateRoute><AdminRouter><AppliedTrainer/></AdminRouter></PrivateRoute>
                },
                {
                    path:'/dashboard/balance',
                    element: <PrivateRoute><AdminRouter><Balance/></AdminRouter></PrivateRoute>
                }

            ]
        }
])

 
export default Routers;