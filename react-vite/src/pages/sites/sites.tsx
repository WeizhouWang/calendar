import { useState, useEffect } from "react";
import { siteDto } from "../../dtos/site-dto";
import axiosInstance from "../../services/http-interceptor";

function Sites() {
  const [sites, setData] = useState<siteDto[]>([]);
  useEffect(() => {
    axiosInstance.get("https://localhost:50640/api/account/sites")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <div className="flex w-full justify-start items-start">
        <table>
          <thead>
            <tr>
              <th>1</th>
              <th>2</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, index) =>
              <tr key={index} >
                <td>{site.id}</td>
                <td>{site.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );

}

export default Sites
