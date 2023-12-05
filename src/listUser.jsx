import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function ListUser({ show }) {
  const [users, setUsers] = useState([]);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const userCookie = Cookies.get("user");
      let formatted = JSON.parse(userCookie);
      const userId = formatted ? formatted.id : 0;
      // parsedData.map((item) => {
      //   if (item.id == userId) {
      //     setUsers([...item.children]);
      //   }
      // });
      setLocalData(parsedData);
      function getAllBranches(data) {
        let branches = [];
        function traverse(node) {
          if (node.children?.length) {
            branches = [...branches,...node.children];
          }
          if (node.children && node.children.length > 0) {
            node.children.forEach(traverse);
          }
        }
        if (data) {
          data.forEach(traverse);
        }
        return branches;
      }
      let temp = parsedData.filter((item) => {
        return item.id == userId;
      });
      if (temp.length > 0) {
        const allBranches = getAllBranches(temp);
        setUsers(allBranches);
        console.log(allBranches)
      }
    }
  }, []);

  const ActionButtonHandler = (id) => {
    const userCookie = Cookies.get("user");
    let formatted = JSON.parse(userCookie);
    const userId = formatted ? formatted.id : 0;

    let temp = [...users];
    temp.map((item) => {
      if (item.id == id) {
        item.status = !item.status;
      }
    });
    setUsers([...temp]);

    const updatedStatus = localData.map((item) => {
      if (item.id === id) {
        item.status = true;
      }
      return item;
    });
    localStorage.setItem("formData", JSON.stringify(updatedStatus));
    console.log(updatedStatus);
  };

  return (
    <>
      <div className="user-management">
        <div className="user-management-h3">
          <h5>User Managment</h5>
        </div>
        <div className="user-management-h3">
          <button
            className="createuserbutton"
            onClick={() => show("createUser")}
          >
            Create User
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.branch}</td>
                <td>{user.status ? "Active" : "InActive"}</td>
                <td>
                  <button
                    className=""
                    onClick={() => ActionButtonHandler(user.id)}
                  >
                    {!user.status ? "Activate" : "Deactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
