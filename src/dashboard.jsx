import React, { useEffect, useState } from "react";
import "./dashboard.css"
const TreeNode = ({ node }) => (
  <div
    style={{
      marginLeft: "20px",
      borderLeft: "1px solid #000",
      paddingLeft: "10px",
    }}
  >
    <br/>
    <div>{`${node.name} - ${node.role}`}</div>
    {node.children && node.children.length > 0 && (
      <div>
        {node.children.map((child, index) => (
          <TreeNode key={index} node={child} />
        ))}
      </div>
    )}
  </div>
);

const Tree = ({ data }) => (
  <div>
    {data.map((rootNode, index) => (
      <TreeNode key={index} node={rootNode} />
    ))}
  </div>
);

const Dashboard = () => {
const [data, setData] = useState([])
  useEffect(() => {
    let storedData = localStorage.getItem("formData");
    storedData = storedData ? JSON.parse(storedData) : [];
    setData(storedData[0].children)
  }, []);

  return (
    <div>
      <h1>Organization Hierarchy</h1>
      <Tree data={data} />
    </div>
  );
};

export default Dashboard;
