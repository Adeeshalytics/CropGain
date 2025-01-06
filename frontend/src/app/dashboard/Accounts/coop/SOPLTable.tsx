import React, { useState, useEffect } from 'react';

// Re-using custom components from the original file
const Alert = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 rounded-lg border ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
);

const SOPLTable = () => {
  // Types for our data structure
  type SOPLEntry = {
    description: string;
    previousMonth: number;
    subtotal: number;
    total: number;
    isEditable: boolean;
    category: 'income' | 'expense';
    isOther?: boolean;
  };

  type SOPLData = {
    incomes: SOPLEntry[];
    expenses: SOPLEntry[];
    startDate: string;
    endDate: string;
  };

  // Add state for dates
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endDate, setEndDate] = useState(new Date());

  // Initial state for income entries
  const initialIncomes: SOPLEntry[] = [
    { 
      description: "Income from crops",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: false,
      category: 'income'
    },
    {
      description: "Tourist bungalow",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'income'
    },
    {
      description: "Tea plants",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'income'
    }
  ];

  // Initial state for expense entries
  const initialExpenses: SOPLEntry[] = [
    {
      description: "Salary & Bonus",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Stationary, insurance, and license",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Bonus",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Retirement Gratuities",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Pension",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Taxes & Assessments",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Electricity",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Depreciation",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Uniforms",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Re-plantation",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Tourist bungalow",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Fertilizers",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Repair and maintenance",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Nursery expenses",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    },
    {
      description: "Telephone expenses",
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: 'expense'
    }
  ];

  const [incomes, setIncomes] = useState<SOPLEntry[]>(initialIncomes);
  const [expenses, setExpenses] = useState<SOPLEntry[]>(initialExpenses);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Format the dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get formatted start date
  const getStartDate = () => {
    return `${startYear}.01.01`;
  };

  useEffect(() => {
    // Calculate totals whenever incomes or expenses change
    const newTotalIncome = incomes.reduce((acc, curr) => acc + curr.total, 0);
    const newTotalExpense = expenses.reduce((acc, curr) => acc + curr.total, 0);
    
    setTotalIncome(newTotalIncome);
    setTotalExpense(newTotalExpense);
    setNetProfitLoss(newTotalIncome - newTotalExpense);
  }, [incomes, expenses]);

  const handleSubtotalChange = (
    index: number,
    value: string,
    type: 'income' | 'expense'
  ) => {
    const numericValue = parseFloat(value) || 0;
    const updateArray = type === 'income' ? [...incomes] : [...expenses];
    const entry = updateArray[index];

    entry.subtotal = numericValue;
    entry.total = entry.previousMonth + numericValue;

    if (type === 'income') {
      setIncomes(updateArray);
    } else {
      setExpenses(updateArray);
    }
  };

  const addNewRow = (type: 'income' | 'expense') => {
    const newEntry: SOPLEntry = {
      description: '',
      previousMonth: 0,
      subtotal: 0,
      total: 0,
      isEditable: true,
      category: type,
      isOther: true
    };

    if (type === 'income') {
      setIncomes([...incomes, newEntry]);
    } else {
      setExpenses([...expenses, newEntry]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    // Update end date to current date when saving
    setEndDate(new Date());
    
    const soplData: SOPLData = {
      incomes,
      expenses,
      startDate: getStartDate(),
      endDate: formatDate(new Date())
    };

    // Show success notification
    setNotification({
      message: 'SOPL data saved successfully!',
      type: 'success'
    });

    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartYear(parseInt(e.target.value));
  };

  // Generate year options (10 years back from current year)
  const yearOptions = Array.from({ length: 11 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });

  const renderTable = (entries: SOPLEntry[], type: 'income' | 'expense') => (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="p-2 border border-gray-300 text-left">Description</th>
          <th className="p-2 border border-gray-300 text-right">Previous Month</th>
          <th className="p-2 border border-gray-300 text-right">Subtotal</th>
          <th className="p-2 border border-gray-300 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="p-2 border border-gray-300">
              {entry.isOther ? (
                <input
                  type="text"
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Other description..."
                  value={entry.description}
                  onChange={(e) => {
                    const updateArray = type === 'income' ? [...incomes] : [...expenses];
                    updateArray[index].description = e.target.value;
                    type === 'income' ? setIncomes(updateArray) : setExpenses(updateArray);
                  }}
                />
              ) : (
                entry.description
              )}
            </td>
            <td className="p-2 border border-gray-300 text-right">
              {entry.previousMonth.toFixed(2)}
            </td>
            <td className="p-2 border border-gray-300">
              <input
                type="number"
                className="w-full px-2 py-1 border rounded text-right"
                value={entry.subtotal || ''}
                onChange={(e) => handleSubtotalChange(index, e.target.value, type)}
                readOnly={!entry.isEditable}
              />
            </td>
            <td className="p-2 border border-gray-300 text-right">
              {entry.total.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      {notification && (
        <Alert className={`mb-4 ${notification.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="text-center">
            <CardTitle>
              <span className="text-2xl font-bold">Morawakkorale Tea Producers Coop Society Ltd - Kotapola</span>
            </CardTitle>
            <p className="text-xl font-semibold">
              Statement of Profit or Loss
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="yearSelect" className="font-medium">Start Year:</label>
                <select
                  id="yearSelect"
                  value={startYear}
                  onChange={handleYearChange}
                  className="px-3 py-1 border rounded"
                >
                  {yearOptions}
                </select>
              </div>
              <p className="text-lg">
                {getStartDate()} to {formatDate(endDate)}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Income</h3>
                <button
                  onClick={() => addNewRow('income')}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm"
                >
                  + Add Other Income
                </button>
              </div>
              {renderTable(incomes, 'income')}
              <div className="mt-2 text-right font-semibold">
                Total Income: {totalIncome.toFixed(2)}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Expenses</h3>
                <button
                  onClick={() => addNewRow('expense')}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm"
                >
                  + Add Other Expense
                </button>
              </div>
              {renderTable(expenses, 'expense')}
              <div className="mt-2 text-right font-semibold">
                Total Expenses: {totalExpense.toFixed(2)}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-center">
                Net {netProfitLoss >= 0 ? 'Profit' : 'Loss'}: {Math.abs(netProfitLoss).toFixed(2)}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default SOPLTable;