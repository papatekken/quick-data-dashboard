
import React from 'react'
import { useStaticQuery, graphql } from "gatsby"


export const DataQuery = (action, reportyear, reportmonth) => {
	
	
	var monthnames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];




	 const office = ['London','New York','Tokyo','Paris','Seoul','Jakarta']
	 var officeamount={1:0,2:0,3:0,4:0,5:0,6:0}
	 
	 const data = useStaticQuery(graphql`
		query {
		  allDataXlsxData{
		  edges {
			node {
				 staffid
				 staffname
				 branchid
				 branchname
				 overallscore
				 friendly
				 efficiency
				 knowledge
				 responsive
				 thoughtful
				 sales
				 Period
			}
		  }
		}
		}
	`)	
	
	var outvalue =''
	var reportperiod= reportyear+("0"+reportmonth).slice(-2)
	var temp= 0
	var counter= 0
	
	if(action=="sales"){
		
		var outData = data.allDataXlsxData.edges.filter(edge => edge.node.Period==reportperiod);
		outData.forEach(edge => {
			temp=temp+edge.node.sales
		})

		outvalue= temp
	}
	if(action=="oindex"){
		data.allDataXlsxData.edges.forEach(edge => {
			if(edge.node.Period==reportperiod){
				temp=temp+edge.node.overallscore
				counter++
			}
		})				  
		outvalue= Math.round(temp/counter)
	}	
	
	if(action=="overallSalesLine"){
		var tempoffice = []
		var tempdataset=[]
		var tempdata=[]
		var group= []
		var loopmonth =reportmonth;
		var loopyear =reportyear;
		var loopperiod;
		var tempResult=[];
		var tempTotal=0;
		for(var i=1;i<=6;i++){
			loopmonth =reportmonth;
			loopyear =reportyear;		
			tempoffice=[]
			tempdataset=[]
			tempdata=[]
			tempoffice["id"]=office[i-1];
			tempoffice["color"]="hsl(292, 70%, 50%)";
			
			for(var j=1;j<=12;j++){
				if((loopyear<2021) || loopyear==2021 &&(j-1)<=new Date().getMonth()){
					tempdata=[]
					loopperiod=loopyear+("0"+j).slice(-2)
					tempResult = data.allDataXlsxData.edges.filter(edge => edge.node.Period==loopperiod);
					tempTotal=0;
					
					tempResult.forEach(edge => {
						if(edge.node.branchid==i)
							tempTotal=tempTotal+edge.node.sales;
					})
					
					
					tempdata["x"]=(loopyear-2000)+"-"+monthnames[j-1];
					tempdata["y"]=tempTotal;
					tempdataset.push(tempdata);		
				}	
			}
			tempoffice["data"]=tempdataset;	
			
			
			
			
			group.push(tempoffice);
		}

		outvalue = group;
	}
		
	if(action=="top3branch"){
		
		var maxsales =0
		var tempoffice ="";
		var outrankset = []
		var outrank = []
		var outData = data.allDataXlsxData.edges.filter(edge => edge.node.Period==reportperiod);
		outData.forEach(edge => {
			officeamount[edge.node.branchid]=officeamount[edge.node.branchid]+ edge.node.sales
		})		
		
		for(var i=1;i<=3;i++){
			outrank = [];
			maxsales=-1;
			tempoffice= "";
			for (const counter in officeamount) {
			  if(officeamount[counter]>maxsales)
					maxsales= officeamount[counter]
			}			

			for (const counter in officeamount) {
			  if(officeamount[counter]==maxsales){
				  if(tempoffice!="") 
					  tempoffice = tempoffice + " ,";
					tempoffice = tempoffice + office[counter-1];
					delete officeamount[counter];
			  }
			}						
			
			outrank["rank"]= i
			outrank["name"]= tempoffice;
			outrank["amount"]=maxsales;
			outrankset[i]=outrank;
		}
		
		//delete officesales["2"];

		outvalue = outrankset;
	}

	if(action=="top3staff"){
		
		var maxsales =0
		var tempstaff ="";
		var outrankset = []
		var outrank = []
		var outData = data.allDataXlsxData.edges.filter(edge => edge.node.Period==reportperiod);
		
		for(var i=1;i<=3;i++){
			outrank = [];
			maxsales=-1;
			tempstaff= "";
			outData.forEach(edge => {
				if(maxsales<edge.node.sales)
				maxsales= edge.node.sales
			})		

			outData.forEach(edge => {
				if(maxsales==edge.node.sales){
				  if(tempstaff!="") 
					  tempstaff = tempstaff + " ,";
					tempstaff = tempstaff + edge.node.staffname;
					
					
				}
			})				

			outData = outData.filter(edge => edge.node.sales!=maxsales);	
			outrank["rank"]= i
			outrank["name"]= tempstaff;
			outrank["amount"]=maxsales;
			outrankset[i]=outrank;
		}

		outvalue = outrankset;
	}	
	
	if(action=="branchSalesPie"){
		var tempoffice = []
		var group= []
		
		var outData = data.allDataXlsxData.edges.filter(edge => edge.node.Period==reportperiod);
		outData.forEach(edge => {
			officeamount[edge.node.branchid]=officeamount[edge.node.branchid]+ edge.node.sales
		})		
			
		for (const counter in officeamount) {
			tempoffice=[]	;
			tempoffice["id"]=office[counter-1];
			tempoffice["label"]=office[counter-1];
			tempoffice["value"]=officeamount[counter];
			group.push(tempoffice);
		}				

			
			
			
			
			
		
		outvalue=group;
	}

	if(action=="cssRadar"){
		var tempdata = []
		var group=[]
		var groupData=[0,0,0,0,0]
		var groupCount=0
		var groupName= ["friendly","efficiency","knowledge","responsive","thoughtful"]
		
		var outData = data.allDataXlsxData.edges.filter(edge => edge.node.Period==reportperiod);
		outData.forEach(edge => {
			groupData[0]=groupData[0]+edge.node.friendly;
			groupData[1]=groupData[1]+edge.node.efficiency;
			groupData[2]=groupData[2]+edge.node.knowledge;
			groupData[3]=groupData[3]+edge.node.responsive;
			groupData[4]=groupData[4]+edge.node.thoughtful;
			groupCount++;
		})		
			

		for (i in groupData){
				tempdata=[]
				tempdata["aspect"]=groupName[i];
				tempdata["score"]=Math.round(groupData[i]/groupCount)
				group.push(tempdata);
		}		
						

			
			
			
			
			
		
		outvalue=group;
	}	
	if(action=="office"){
		outvalue=office;
	}
	return outvalue
	/*
	if(action=="yes")
		return reportyear
	else
		return "no"
	*/
}



