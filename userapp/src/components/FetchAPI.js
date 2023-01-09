import React,{ useEffect,useState } from 'react'


export default function FetchApi() {
 const [data,setData] = useState([]);
 const [query,setQuery] = useState("")
 const getApi = () =>
 {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then((response) => response.json())
     .then((formData) => {
      setData(formData.map((d)=>
      {
        return{
          select:false,
          id:d.id,
          name:d.name,
          email:d.email,
          role:d.role
        }
        
  
      }));
        
        console.log(formData);
     });
    
    // setSearchResults(data);

    }
    const deleteById = id => {
      setData(oldValues => {
        return oldValues.filter(val => val.id !== id)
      })
      document.getElementById(id).removeChild()
    }
    // const handleSearchChange = (e) =>
    // {
    //   if(!e.target.value)
    //   return getApi();
    //  setData(values => values.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())) );
    //   console.log(e.target.value);
    // }

   
    useEffect(getApi,[])
 
  
  return(
    <div>

<div class="form-group has-search">
    <span class="fa fa-search form-control-feedback"></span>
    <input type="text" class="form-control" placeholder="Search by name, email or role" onChange={e=>setQuery(e.target.value)} />
  </div>
       <table className="table" id="list">
  
    <tr>
      <th><input type="checkbox" id="all-check" onChange={e=>
      {
        let checked = e.target.checked;
        setData(data.map(d=>
          {
            d.select = checked;
            
            return d;
          }))

          let rows = document.getElementsByClassName("rows");
          
          

            for(let i=0;i<rows.length;i++)
            {
              if(checked)
              rows[i].setAttribute("style","background-color:gray;");
              else
              rows[i].setAttribute("style","");
            }
          

      }} ></input></th>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
     </tr>
  
  
    {
      data.filter(item=>item.name.toLowerCase().includes(query)||item.email.toLowerCase().includes(query)).map((item)=>

    <tr id={item.id} className="rows" key={item.id}>
      <td><input type="checkbox" id="single-check" onChange={(event)=>
      {
        let checked = event.target.checked;
        
        setData(
          data.map(d=>
          {
            if(d.id===item.id)
            {
              d.select = checked;
            }
            return d;
          }))
          let val = item.id;
          if(checked)
          {
            document.getElementById(val).setAttribute("style","background-color:gray;")
          }
          else{
            document.getElementById(val).setAttribute("style","")
          }
        
      }}
     checked={item.select}></input></td>
      <td >{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td>
        {/* <button onClick={()=>deleteById(item.id)}>Delete</button> */}
          <span onClick={()=>deleteById(item.id)} className="glyphicon glyphicon-trash delete" ></span>
          <span></span><span class="glyphicon glyphicon-edit edit"></span>
        </td>
    </tr>
      )
    }
    

</table>
      
  
        
        
    </div>
  )

  }
