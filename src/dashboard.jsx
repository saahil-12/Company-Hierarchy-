import React, { useEffect, useState } from "react";
import "./dashboard.css";

const TreeNode = ({ node }) => (
  <div className="family-tree-node">
    <ul>
      <li>
        <div className="node-content">
          <img width={100} src={node?.images[0]} />
          <span className="employee-details">{node.name}</span>
          {/* <br/> */}
          <span className="employee-role">{node.role}</span>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="children-container">
            {node.children.map((child, index) => (
              <TreeNode key={index} node={child} />
            ))}
          </div>
        )}
      </li>
    </ul>
  </div>
);

const Tree = ({ data }) => (
  <div className="family-tree">
    {data.map((rootNode, index) => (
      <TreeNode key={index} node={rootNode} />
    ))}
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let storedData = localStorage.getItem("formData");
    storedData = storedData ? JSON.parse(storedData) : [];
    setData(storedData[0].children);
  }, []);

  return (
    <>
      <div>
        <h1 style={{textAlign:"left"}}>Organization Hierarchy</h1>
        <Tree data={data} />
      </div>
    </>
  );
};

export default Dashboard;
