import React from "react"
import { Link } from "gatsby"
import Typography from "typography"
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'

import Image from "../components/image"
import ChartLine from "../components/linechart"
import ChartRadar from "../components/radarchart"
import ChartPie from "../components/piechart"
import getParam from "../services/getParam"
import RankingTop3 from "../components/rankingTop3"
import {DataQuery} from "../services/dataQuery"

import "./mView.css"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const mView = ({ search }) => {
  const { inmonth } = search
  const { inyear } = search
  var rmonth
  var ryear
  
	if (!inmonth) 
		rmonth=("0" + (new Date().getMonth() + 1)).slice(-2)
	else
		rmonth= inmonth

	
	if (!inyear) 
		if(new Date().getFullYear()> 2020 ||new Date().getFullYear()< 2019){
			ryear= 2020
			rmonth=12
		}
		else
			ryear= new Date().getFullYear()
	else
		ryear= inyear
	
  return(	
	  <>
		
			<div class="row">
			<div class="col-3 col-s-3">
			This month sales: <span style={{color: "#779ECB",fontSize:22}}>{DataQuery('sales',ryear,rmonth)} </span>
			</div>
<div class="col-3 col-s-3">
This month CSS overall score: <span style={{color: "#779ECB",fontSize:22}}>{DataQuery('oindex',ryear,rmonth)}</span>
			</div>
			</div>  
	   <div class="row">
		<div class="col-7 col-s-10">

			<div class="row">
				<div style={{background: "#B6B6B4",color:"#FFF", paddingLeft: "10px"}}>Monthly Sales</div>
				<ChartLine inData={DataQuery('overallSalesLine',ryear,rmonth)}  /> 
			</div>
			<div class="row">
				<div class="col-6 col-s-10">
					<div style={{background: "#B6B6B4",color:"#FFF", paddingLeft: "10px"}}>Top 3 Branch Sales</div>
					<RankingTop3 tableType='branchSales' inData={DataQuery('top3branch',ryear,rmonth)}/>
				</div>
				<div class="col-6 col-s-10">
					<div style={{background: "#B6B6B4",color:"#FFF", paddingLeft: "10px"}}>Top 3 Staff Sales</div>
					<RankingTop3 tableType='staffSales' inData={DataQuery('top3staff',ryear,rmonth)}/>			
				</div>			
			</div>
		</div>
		<div class="col-5 col-s-10">
			<div class="row">
				<div style={{background: "#B6B6B4",color:"#FFF", paddingLeft: "10px"}}>This month Score</div>
				<ChartPie inData={DataQuery('branchSalesPie',ryear,rmonth)}/>
			</div>
			<div class="row">
				<div style={{background: "#B6B6B4",color:"#FFF", paddingLeft: "10px"}}>This month Customer Satisfaction Score</div>
				<ChartRadar inData={DataQuery('cssRadar',ryear,rmonth)} office={DataQuery('office',ryear,rmonth)}/>
			</div>

		</div>	
	   </div>
	</>
   )
}
export default getParam(mView)

