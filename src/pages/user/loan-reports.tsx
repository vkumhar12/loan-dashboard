/* eslint-disable @next/next/no-img-element */
import AppLayout from "@/layout/user";

const LoanReports = () => {
  const loanReports = [
    {
      applicationNo: "12345",
      applicationDate: "2023-08-30",
      status: "In Progress",
    },
    {
      applicationNo: "12346",
      applicationDate: "2023-09-01",
      status: "Submitted",
    },
    {
      applicationNo: "12347",
      applicationDate: "2023-09-03",
      status: "Approved",
    },
    {
      applicationNo: "12348",
      applicationDate: "2023-09-04",
      status: "Rejected",
    },
  ];
  return (
    <AppLayout title="Loan Reports">
      <div className="admin-container flex flex-col gap-6">
        <h2 className="text-3xl font-bold">Loan Reports</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className=" text-black p-4  flex justify-between items-center admin-card rounded-lg">
            <p className="font-medium text-lg">
              In Progress Loan <br /> Application
            </p>

            <img src="/pending.png" alt="" className="w-20 h-20" />
          </div>
          <div className=" text-black p-4  flex items-center admin-card justify-between rounded-lg">
            <p className="font-medium text-lg">
              Submitted Loan <br /> Application
            </p>
            <img src="/submit.png" alt="" className="w-20 h-20" />
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="border border-gray-300 p-2">Application No.</th>
              <th className="border border-gray-300 p-2">Application Date</th>
              <th className="border border-gray-300 p-2">Application Status</th>
            </tr>
          </thead>
          <tbody>
            {loanReports.map((report, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">
                  {report.applicationNo}
                </td>
                <td className="border border-gray-300 p-2">
                  {report.applicationDate}
                </td>
                <td
                  className={`border border-gray-300 p-2 font-semibold ${
                    report.status === "In Progress"
                      ? "text-yellow-600"
                      : report.status === "Submitted"
                      ? "text-blue-500"
                      : report.status === "Approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {report.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default LoanReports;
