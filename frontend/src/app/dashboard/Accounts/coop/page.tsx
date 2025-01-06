"use client"
import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import SOPLTable from './SOPLTable';  // Adjust the path as needed

// Custom Alert Component
const Alert = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 rounded-lg border ${className}`}>
    {children}
  </div>
)

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
)

// Custom Card Components
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
)

// Custom Tabs Components
const TabsContext = React.createContext({ value: "", onChange: (value: string) => {} })

const Tabs = ({ defaultValue, children, className = "" }: { defaultValue: string, children: React.ReactNode, className?: string }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`inline-flex items-center justify-center rounded-lg bg-gray-100 p-1 ${className}`}>
    {children}
  </div>
)

const TabsTrigger = ({ value, children, onClick }: { value: string, children: React.ReactNode, onClick?: () => void }) => {
  const context = React.useContext(TabsContext)
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
        ${context.value === value ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
      onClick={() => {
        context.onChange(value)
        onClick?.()
      }}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, children }: { value: string, children: React.ReactNode }) => {
  const context = React.useContext(TabsContext)
  if (context.value !== value) return null
  return <div>{children}</div>
}

function IncomeTable() {
  type Crop = {
    name: string
    income: number
    isEditable?: boolean
  }

  type Notification = {
    message: string
    type: "success" | "error"
  }

  const [activeTab, setActiveTab] = useState("income")
  const [crops, setCrops] = useState<Crop[]>([
    { name: "Crop A", income: 50 },
    { name: "Crop B", income: 56 }
  ])
  const [totalIncome, setTotalIncome] = useState(0)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [activeChart, setActiveChart] = useState<"pie" | "bar">("bar")

  const COLORS = ["#0ea5e9", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"]

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleInputChange = (index: number, field: keyof Crop, value: string) => {
    const updatedCrops = [...crops]
    ;(updatedCrops[index][field] as string | number) = field === "name" ? value : parseFloat(value) || 0
    setCrops(updatedCrops)
  }

  useEffect(() => {
    const total = crops.reduce((acc, crop) => acc + crop.income, 0)
    setTotalIncome(total)
  }, [crops])

  const addRow = () => {
    setCrops([...crops, { name: "", income: 0 }])
  }

  const deleteRow = (index: number) => {
    const cropName = crops[index].name
    const updatedCrops = crops.filter((_, i) => i !== index)
    setCrops(updatedCrops)
    showNotification(`${cropName} has been deleted successfully`, "success")
  }

  const editRow = (index: number) => {
    const updatedCrops = [...crops]
    if (updatedCrops[index].isEditable) {
      updatedCrops[index].isEditable = false
      showNotification(`${updatedCrops[index].name} has been updated successfully`, "success")
    } else {
      updatedCrops[index].isEditable = true
    }
    setCrops(updatedCrops)
  }

  const CropCharts = () => {
    const data = crops.map(crop => ({
      name: crop.name,
      value: crop.income,
      income: crop.income
    }))

    return (
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Income Breakdown</CardTitle>
            <div className="space-x-2">
              <button
                onClick={() => setActiveChart("pie")}
                className={`px-3 py-1 rounded ${activeChart === "pie" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Pie Chart
              </button>
              <button
                onClick={() => setActiveChart("bar")}
                className={`px-3 py-1 rounded ${activeChart === "bar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Bar Chart
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === "pie" ? (
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              ) : (
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#3b82f6">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderIncomeTab = () => (
    <div>
      {notification && (
        <Alert className={`mb-4 ${notification.type === "success" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Income from Crops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <button
              onClick={addRow}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              + Add Crop
            </button>
          </div>

          <table className="w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-2 border border-gray-300">Crop Name</th>
                <th className="p-2 border border-gray-300">Income</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      value={crop.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      readOnly={!crop.isEditable}
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={crop.income}
                      onChange={(e) => handleInputChange(index, "income", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      readOnly={!crop.isEditable}
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    {!crop.isEditable ? (
                      <>
                        <button
                          onClick={() => editRow(index)}
                          className="mr-2 text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteRow(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => editRow(index)}
                        className="text-green-500 hover:text-green-700"
                      >
                        Save
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="p-2 border border-gray-300 font-bold">Total Income</td>
                <td className="p-2 border border-gray-300">{totalIncome.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <CropCharts />
    </div>
  )

  const renderSOPLTab = () => (
    <SOPLTable />
  );

  function renderHistoryTab() {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
          <TabsTrigger value="income" onClick={() => setActiveTab("income")}>Income</TabsTrigger>
          <TabsTrigger value="sopl" onClick={() => setActiveTab("sopl")}>SOPL</TabsTrigger>
          <TabsTrigger value="history" onClick={() => setActiveTab("history")}>History</TabsTrigger>
        </TabsList>

        <TabsContent value="income">{renderIncomeTab()}</TabsContent>
        <TabsContent value="sopl">{renderSOPLTab()}</TabsContent>
        <TabsContent value="history">{renderHistoryTab()}</TabsContent>
      </Tabs>
    </div>
  )
}

export default IncomeTable