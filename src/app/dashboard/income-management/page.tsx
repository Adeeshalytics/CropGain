export default function Income(){

    return(

        <div className="flex min-h-screen">
        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-medium mb-12 mt-3">Income</h1>
            <div className="space-y-12">
            <section>
                <h2 className="text-3xl font-medium mb-4">
                  Crop & byproduct Sales
                </h2>
                <table className="w-full bg-white overflow-hidden mx-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Units
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Income
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Section
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={6}
                        className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                      >
                        <button className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600">
                          <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
                            +
                          </span>
                          <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                            Add crop or product
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>




              <section>
                <h2 className="text-3xl font-medium mb-4">
                  Miscellaneous Income
                </h2>
                <table className="w-full bg-white overflow-hidden mx-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Cost
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Units
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                        Section
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={6}
                        className="px-0 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                      >
                        <button className="w-full h-full text-black flex items-center justify-center space-x-2 bg-white border border-black py-2 px-4 group hover:border-green-600">
                          <span className="inline-flex items-center justify-center w-7 h-7 text-3xl bg-white border-2 border-black rounded-full text-black group-hover:text-green-600 group-hover:border-green-600 transition-colors duration-300">
                            +
                          </span>
                          <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                            Add Income
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>


            </div>
          </div>
        </main>
      </div>



    );
}