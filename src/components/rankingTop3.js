import React from "react"
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

function renderTitle(tableType){
   if(tableType== 'branchSales')
      return <Tr><Th>Rank</Th><Th>Branch</Th><Th>Sales</Th></Tr>;
   else if(tableType== 'staffSales')
	  return <Tr><Th>Rank</Th><Th>Staff</Th><Th>Sales</Th></Tr>;
   return <Tr></Tr>;
}

const rankingTop3 = ({tableType,inData} ) => {
	


	
	return(
		<Table>
			<Thead>
				{renderTitle(tableType)}
			</Thead>
			<Tbody>
			  {inData.map((row, i)  => (
				<tr>
				  <td>{row.rank}</td>
				  <td>{row.name}</td>
				  <td>{row.amount}</td>
				</tr>
			  ))}					
			</Tbody>
		</Table>	
	)
}


export default rankingTop3