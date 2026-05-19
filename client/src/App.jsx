import { getToken, onMessage } from "firebase/messaging";

import { messaging } from "./firebase";

import {
  useState,
  useEffect,
} from "react";


import axios from "axios";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {

  // ======================
  // LOGIN
  // ======================
  useEffect(() => {

  requestPermission();

}, []);

useEffect(() => {

  const unsubscribe =
    onMessage(
      messaging,
      (payload) => {

        console.log(
          "Foreground message:",
          payload
        );

        if (
          Notification.permission ===
          "granted"
        ) {

          new Notification(

            payload.notification.title,

            {
              body:
                payload.notification.body,
              icon:
                "/vite.svg",
            }

          );

        }

      }
    );

  return () => unsubscribe();

}, []);

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // ======================
  // UI STATES
  // ======================

  const [darkMode, setDarkMode] =
    useState(true);

  const [activePage, setActivePage] =
    useState("dashboard");

  const [notifications, setNotifications] =
    useState(true);

  const [aiOptimization, setAiOptimization] =
    useState(true);

  // ======================
  // DEVICES
  // ======================

  const [devices, setDevices] =
    useState([]);

  const [deviceName, setDeviceName] =
    useState("");

  const [deviceUsage, setDeviceUsage] =
    useState("");

  // ======================
  // FETCH DEVICES
  // ======================

  useEffect(() => {

    fetchDevices();

    Notification.requestPermission();

  }, []);

  const fetchDevices = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/devices"
        );

      setDevices(response.data);

    } catch (error) {

      console.log(error);

    }

  };
  const requestPermission = async () => {

  try {

    const permission =
      await Notification.requestPermission();

    if (permission === "granted") {

      const token = await getToken(
        messaging,
        {
          vapidKey:
            "BOzh7bUxa2ln-B93tgl77h8tK-wLy1IA4PMvWqrnffv7N0uXSpCG_6zOhmfGg4OuPwxqIjXpAFI2YUZE99S1MOA",
        }
      );

      console.log("FCM TOKEN:", token);

    }

  } catch (error) {

    console.log(error);

  }

};
  // ======================
  // LOGIN
  // ======================

  const login = () => {

    if (
      !email ||
      !password
    ) {

      alert(
        "Enter Email & Password"
      );

      return;

    }

    setLoggedIn(true);

  };

  // ======================
  // HIGHEST DEVICE
  // ======================

  const highestUsageDevice =
    devices.length > 0

      ? devices.reduce(
          (max, device) =>

            device.usage >
            max.usage

              ? device

              : max
        )

      : {

          name: "No Device",

          usage: 0,

        };

  // ======================
  // AI OPTIMIZATION
  // ======================

  const optimizedDevices =
    devices.map((device) => {

      if (
        aiOptimization &&
        device._id ===
          highestUsageDevice._id
      ) {

        return {

          ...device,

          optimizedUsage:
            Math.floor(
              device.usage * 0.8
            ),

        };

      }

      return {

        ...device,

        optimizedUsage:
          device.usage,

      };

    });

  // ======================
  // TOTALS
  // ======================

  const totalUsage =
    optimizedDevices.reduce(
      (sum, device) =>

        sum +
        device.optimizedUsage,

      0
    );

  const monthlyCost =
    totalUsage * 8;

  const savings =
    Math.floor(
      totalUsage * 0.2
    );

  // ======================
  // PEAK TIME
  // ======================

  let peakUsageTime = "";

  if (totalUsage < 100) {

    peakUsageTime = "10 AM";

  } else if (
    totalUsage < 300
  ) {

    peakUsageTime = "2 PM";

  } else {

    peakUsageTime = "7 PM";

  }

  // ======================
  // AI MESSAGE
  // ======================

  let aiRecommendation = "";

  if (!aiOptimization) {

    aiRecommendation =
      "AI Optimization Disabled";

  } else {

    aiRecommendation =
      `${highestUsageDevice.name} usage reduced by 20% for better energy efficiency.`;

  }

  // ======================
  // CHART DATA
  // ======================

  const chartData =
    optimizedDevices.map(
      (device) => ({

        name: device.name,

        usage:
          device.optimizedUsage,

      })
    );

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  // ======================
  // ADD DEVICE
  // ======================

  const addDevice = async () => {

    if (
      !deviceName ||
      !deviceUsage
    ) {

      alert(
        "Fill all fields"
      );

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/devices",
        {

          name: deviceName,

          usage: Number(
            deviceUsage
          ),

        }
      );

      setDeviceName("");

      setDeviceUsage("");

      fetchDevices();

      if (
        notifications &&
        Notification.permission ===
          "granted"
      ) {

        new Notification(
          "⚡ WattWise",
          {

            body:
              "Device Added Successfully",

          }
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Add Device"
      );

    }

  };

  // ======================
  // DELETE DEVICE
  // ======================

  const deleteDevice = async (
    id
  ) => {

    await axios.delete(
      `http://localhost:5000/api/devices/${id}`
    );

    fetchDevices();

  };

  // ======================
  // LOGIN PAGE
  // ======================

  if (!loggedIn) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

        <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md shadow-2xl">

          <h1 className="text-5xl font-bold text-green-400 text-center mb-8">
            WattWise
          </h1>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 p-4 rounded-xl outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-slate-800 p-4 rounded-xl outline-none"
            />

            <button
              onClick={login}
              className="w-full bg-green-500 p-4 rounded-xl font-bold"
            >
              Login
            </button>

          </div>

        </div>

      </div>

    );

  }

  // ======================
  // MAIN UI
  // ======================

  return (

    <div
      className={`flex min-h-screen ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* SIDEBAR */}

      <div
        className={`w-64 p-6 ${
          darkMode
            ? "bg-slate-900"
            : "bg-white shadow-xl"
        }`}
      >

        <h1 className="text-4xl font-bold text-green-400 mb-10">
          WattWise
        </h1>

        <div className="space-y-6 text-lg">

          <div
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
            className="cursor-pointer hover:text-green-400"
          >
            Dashboard
          </div>

          <div
            onClick={() =>
              setActivePage(
                "analytics"
              )
            }
            className="cursor-pointer hover:text-green-400"
          >
            Analytics
          </div>

          <div
            onClick={() =>
              setActivePage(
                "devices"
              )
            }
            className="cursor-pointer hover:text-green-400"
          >
            Devices
          </div>

          <div
            onClick={() =>
              setActivePage(
                "settings"
              )
            }
            className="cursor-pointer hover:text-green-400"
          >
            Settings
          </div>

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold">
              Energy Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Welcome,
              {" "}
              {email}
            </p>

          </div>

          <button
            onClick={() =>
              setLoggedIn(false)
            }
            className="bg-red-600 px-6 py-3 rounded-xl"
          >
            Logout
          </button>

        </div>

        {/* DASHBOARD */}

        {activePage ===
          "dashboard" && (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-slate-900"
                  : "bg-white shadow-xl"
              }`}
            >

              <h2>Total Usage</h2>

              <p className="text-5xl font-bold mt-4">
                {totalUsage} kWh
              </p>

            </div>

            <div
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-slate-900"
                  : "bg-white shadow-xl"
              }`}
            >

              <h2>Monthly Cost</h2>

              <p className="text-5xl font-bold mt-4">
                ₹{monthlyCost}
              </p>

            </div>

            <div
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-slate-900"
                  : "bg-white shadow-xl"
              }`}
            >

              <h2>Savings</h2>

              <p className="text-5xl font-bold mt-4 text-green-400">
                ₹{savings}
              </p>

            </div>

          </div>

        )}

        {/* ANALYTICS */}

        {activePage ===
          "analytics" && (

          <div>

            <h1 className="text-5xl font-bold mb-8">
              Analytics
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

              <div
                className={`p-6 rounded-2xl ${
                  darkMode
                    ? "bg-slate-900"
                    : "bg-white shadow-xl"
                }`}
              >

                <ResponsiveContainer width="100%" height={300}>

                  <BarChart data={chartData}>

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="usage"
                      fill="#22c55e"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

              <div
                className={`p-6 rounded-2xl ${
                  darkMode
                    ? "bg-slate-900"
                    : "bg-white shadow-xl"
                }`}
              >

                <ResponsiveContainer width="100%" height={300}>

                  <PieChart>

                    <Pie
                      data={chartData}
                      dataKey="usage"
                      outerRadius={100}
                      label
                    >

                      {chartData.map(
                        (entry, index) => (

                          <Cell
                            key={index}
                            fill={
                              COLORS[index % COLORS.length]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            <div
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-slate-900"
                  : "bg-white shadow-xl"
              }`}
            >

              <h2 className="text-3xl font-bold mb-4">
                AI Recommendation
              </h2>

              <p className="text-xl mb-4">
                {aiRecommendation}
              </p>

              <div className="mt-4 space-y-3">

                <div
                  className={`p-4 rounded-xl ${
                    darkMode
                      ? "bg-slate-800"
                      : "bg-gray-200"
                  }`}
                >

                  <h2 className="text-xl font-bold mb-2">
                    Optimized Total Usage
                  </h2>

                  <p className="text-green-400 text-2xl">

                    {totalUsage}
                    {" "}
                    kWh

                  </p>

                </div>

                <div
                  className={`p-4 rounded-xl ${
                    darkMode
                      ? "bg-slate-800"
                      : "bg-gray-200"
                  }`}
                >

                  <h2 className="text-xl font-bold mb-2">
                    Optimized Device
                  </h2>

                  <p className="text-yellow-400 text-xl">

                    {highestUsageDevice.name}

                  </p>

                  <p className="mt-2">

                    Original:
                    {" "}
                    {
                      highestUsageDevice.usage
                    }
                    {" "}
                    kWh

                  </p>

                  <p>

                    Reduced:
                    {" "}
                    {Math.floor(
                      highestUsageDevice.usage *
                        0.8
                    )}
                    {" "}
                    kWh

                  </p>

                </div>

              </div>

              <p className="mt-6">
                Highest Usage Device:
                {" "}
                <span className="text-green-400">
                  {
                    highestUsageDevice.name
                  }
                </span>
              </p>

              <p className="mt-2">
                Peak Usage Time:
                {" "}
                <span className="text-yellow-400">
                  {peakUsageTime}
                </span>
              </p>

            </div>

          </div>

        )}

        {/* DEVICES */}

        {activePage ===
          "devices" && (

          <div>

            <h1 className="text-5xl font-bold mb-8">
              Devices
            </h1>

            <div className="flex gap-4 mb-8">

              <input
                type="text"
                placeholder="Device Name"
                value={deviceName}
                onChange={(e) =>
                  setDeviceName(
                    e.target.value
                  )
                }
                className={`px-4 py-3 rounded-xl flex-1 ${
                  darkMode
                    ? "bg-slate-800"
                    : "bg-gray-200"
                }`}
              />

              <input
                type="number"
                placeholder="Usage"
                value={deviceUsage}
                onChange={(e) =>
                  setDeviceUsage(
                    e.target.value
                  )
                }
                className={`px-4 py-3 rounded-xl flex-1 ${
                  darkMode
                    ? "bg-slate-800"
                    : "bg-gray-200"
                }`}
              />

              <button
                onClick={addDevice}
                className="bg-green-600 px-6 py-3 rounded-xl"
              >
                Add Device
              </button>

            </div>

            <div className="space-y-4">

              {optimizedDevices.map(
                (device) => (

                  <div
                    key={device._id}
                    className={`p-5 rounded-2xl flex justify-between items-center ${
                      darkMode
                        ? "bg-slate-900"
                        : "bg-white shadow-xl"
                    }`}
                  >

                    <div>

                      <h2 className="text-2xl font-bold">
                        {device.name}
                      </h2>

                      <p>

                        {device.optimizedUsage}
                        {" "}
                        kWh

                      </p>

                    </div>

                    <button
                      onClick={() =>
                        deleteDevice(
                          device._id
                        )
                      }
                      className="bg-red-600 px-5 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* SETTINGS */}

        {activePage ===
          "settings" && (

          <div>

            <h1 className="text-5xl font-bold mb-8">
              Settings
            </h1>

            <div
              className={`p-6 rounded-2xl space-y-6 ${
                darkMode
                  ? "bg-slate-900"
                  : "bg-white shadow-xl"
              }`}
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl">
                  Dark Mode
                </h2>

                <button
                  onClick={() =>
                    setDarkMode(
                      !darkMode
                    )
                  }
                  className="bg-green-500 px-5 py-2 rounded-xl"
                >
                  {
                    darkMode
                      ? "ON"
                      : "OFF"
                  }
                </button>

              </div>

              <div className="flex justify-between items-center">

                <h2 className="text-2xl">
                  Notifications
                </h2>

                <button
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                  className="bg-blue-500 px-5 py-2 rounded-xl"
                >
                  {
                    notifications
                      ? "ON"
                      : "OFF"
                  }
                </button>

              </div>

              <div className="flex justify-between items-center">

                <h2 className="text-2xl">
                  AI Optimization
                </h2>

                <button
                  onClick={() =>
                    setAiOptimization(
                      !aiOptimization
                    )
                  }
                  className="bg-purple-500 px-5 py-2 rounded-xl"
                >
                  {
                    aiOptimization
                      ? "ON"
                      : "OFF"
                  }
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;