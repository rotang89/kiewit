import {useState} from 'react';
import './App.css'

var employee_data = [
  {
    name: "Beyonce Knowles",
    department: "Music",
    age: 39,
  },
  {
    name: "Ryan Reynolds",
    department: "Film",
    age: 44,
  },
  {
    name: "Anne Hathaway",
    department: "Film",
    age: 38,
  },
  {
    name: "Ki Hong Lee",
    department: "Film",
    age: 34,
  },
  {
    name: "David Beckham",
    department: "Sports",
    age: 45,
  },
  {
    name: "Camila Cabello",
    department: "Music",
    age: 23,
  },
  {
    name: "Serena Williams",
    department: "Sports",
    age: 39,
  },
];

const departmentList = ['All', ...new Set(employee_data.map(employee => employee.department))];

const ageRange = ['All', ...new Set(employee_data.map(employee => employee.age-(employee.age%10)))].sort((a,b)=>a-b);

function App() {

  const [employeeList, setEmployeeList] = useState(employee_data);
  const [searchName, setSearchName] = useState('');
  const [department, setDepartment] = useState(departmentList[0]);
  const [age, setAge] = useState(ageRange[0]);

  const employees = employeeList.map(employee => {
    return (
      <tr>
        <td className='tableCol'>{employee.name}</td>
        <td className='tableCol'>{employee.department}</td>
        <td className='tableCol'>{employee.age}</td>
      </tr>
    )
  })

  const handleName = ({target}) => {
    setSearchName(target.value);
  }

  const findName = () => {
    setEmployeeList(employee_data.filter(employee => employee.name.toUpperCase().includes(searchName.toUpperCase())));
  }

  const handleDepartment = ({target}) => {
    setDepartment(target.value);
  }

  const handleAge = ({target}) => {
    setAge(target.value==='All' ? target.value : Number(target.value));
  }

  const filterEmployees = () => {
    setEmployeeList(employee_data.filter(employee => {
      if (age === 'All')  return employee;
      return (employee.age > age && employee.age < age+10)
    }));
    setEmployeeList(prev => {
      return (
        prev.filter(employee => {
          if (department === 'All') return employee;
          return employee.department === department;
        })
      )
    })
  }

  const showAll = () => {
    setEmployeeList(employee_data);
    setDepartment('All');
    setAge('All');
  }

  return (
    <div className="App">
      <div className='searchContainer'>
        <h1>FIND YOUR EMPLOYEE</h1>
        <span className='searchField'>
          <h3>Name</h3>
          <input className='nameInput' onChange={handleName}></input>
          <button className='filterButton' onClick={findName}>Search</button>
        </span>
        <span className='searchField'>
          <span className='filters'>
            <h3>Department</h3>
            <select className='employeeFilter' onChange={handleDepartment} value={department}>
              {departmentList.map(department => <option value={department}>{department}</option>)}
            </select>
          </span>
          <span className='filters'>
          <h3>Age</h3>
            <select className='employeeFilter' onChange={handleAge} value={age}>
                {ageRange.map(age => <option value={age}>{age==='All' ? age : `${age}-${age+9}`}</option>)}
            </select>
          </span>
          <div>
            <button className='filterButton' onClick={filterEmployees}>Filter</button>
          </div>
        </span>
      </div>
      <div>
        <button className='showButton' onClick={showAll}>Show All</button>
      </div>
      <table className='employeeTable'>
        <tr>
          <th className='tableCol'>Name</th>
          <th className='tableCol'>Department</th>
          <th className='tableCol'>Age</th>
        </tr>
        {employees}
      </table>
    </div>
  );
}

export default App;
