import "./dashboard.css"

export default function Dashboard(){
    return(
        <div className="tree">
            <ul>
                <li><span>CEO</span>
                    <ul>
                        <li><span>CTO</span>
                            <ul>
                                <li><span>Product Engineer</span></li>
                                <li><span>Buisness Analyst</span></li>
                            </ul>
                        </li>
                        <li><span> Manager</span>
                            <ul>
                                <li><span>Developer</span></li>
                                <li><span>Tester</span></li>
                                <li><span>Designer</span></li>
                            </ul>
                        </li>
                        <li><span> HR</span></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}