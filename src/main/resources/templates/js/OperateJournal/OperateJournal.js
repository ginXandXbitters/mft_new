var userpower="";
var indexLoading;
$(function()
{
	userpower=$("#userpower").val();
	
	$("#Btnselect").click(function(){PageSelect(0,2);});//查询单击
	
	$("#DeleteOnChecked").click(function(){ DeleteOnChecked();});//删除多条
	
	$("#DeleteOnWhere").click(function(){DeleteOnWhere();});//删除查询结果
	//分页
	$("#Sta").click(function(){Sta();});
	
	$("#Last").click(function(){Last();});
	
	$("#skipPage").click(function(){skipPage();});
	
	$("#Next").click(function(){Next();});
	
	$("#End").click(function(){End();});
	
	$("#DataListShow").change(function(){DataListShow();});
	
	PageSelect(0,2);
	
	$("#AllChecked").click(function(){AllCheckedClick();});// 多选框单击
	

});

//操作记录
function PerationNoteShow(id,name)
{
	if(IdenOnPowerAndCode(userpower,"SeOSAO","查看操作记录")==true)
	{
		$('#OperationnNoteModal').modal('show');//显示模态窗体
		$("#IF_ONote").attr("src","");
		$("#IF_ONote").attr("src","servlet/OperateJournal/OperateJournaServlet?type=OperationnNoteOnLoginId&loginId="+id);
		$("#Name_M").text(name);
	}
}
//数据详情
//操作记录
function PerationDataShow(id)
{
	if(IdenOnPowerAndCode(userpower,"SeCSAO","查看操作数据")==true)
	{
		$('#OperationnDataModal').modal('show');//显示模态窗体
		$("#IF_Data").attr("src","");
		$("#IF_Data").attr("src","servlet/OperateJournal/OperateJournaServlet?type=OperationnDataShowOnORID&id="+id);
	}
}


//多选按钮设置！
function AllCheckedClick()
{
	var curBool=document.getElementById('AllChecked').checked;
	var input= document.getElementById('Tbodytable').getElementsByTagName("input");
	for(var i=0;i<input.length;i++)
	{
		input[i].checked=curBool;
	}
}
function T_checkedClick(obj)//多选单击事件
{
	var input= document.getElementById('Tbodytable').getElementsByTagName("input");
	var count=input.length;
	var trueCount=0;
	for(var i=0;i<count;i++)
	{
		if(input[i].checked==true)
		{
		trueCount++;
		}
	}
	
	if(trueCount==count)
	{
		document.getElementById('AllChecked').checked=true;
	}else
	{
		document.getElementById('AllChecked').checked=false;
	}
}
//------------------------------------------------------------------------------------查询🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃
var PageSize=5;//页码
var Objpra=new Object();//查询的参数
//CurPage 当前页码   type 是否增删数据！（ 1  为 重新绑定总页数   0表示分页跳转 2 单击查询！）
//分页查询
function PageSelect(CurPage,type)
{
	if(IdenOnPowerAndCode(userpower,"SeSAO","查看操作日志录")==true)
	{
		 //usertypeId, name, stateId, PageSta, PageSize
		 document.getElementById('AllChecked').checked=false;//取消
		 var systemId=$("#SystemModularity").find("option:checked").attr("number"); //当前系统的ID
		 var username=$("#username").val();
		 var modulIds=$("#modulIds").attr("vid");//模块id集合
		 var staDate=IdenDate($("#staDate").val());//判断时间格式
		 var endDate=IdenDate($("#endDate").val());//判断时间格式
		 //验证当前时间是否是时间格式    否 的情况下就设置    ""
		 if(type==2)//查询单击
			{
				$("#CurPage").val(1);//设置当前页码
				$("#CurPageTop").text(1);
				CurPage=1;
				//保存条件
				Objpra.systemId=systemId;
				Objpra.username=username;
				Objpra.modulIds=modulIds;
				Objpra.staDate=staDate;
				Objpra.endDate=endDate;
			} 
		 indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
		 $.ajax({
	        type: 'post',//可选get
	        url: 'servlet/OperateJournal/OperateJournaServlet',//这里是接收数据的PHP程序
	        data: {type:"OperateJournaSelect",
	        	systemId:Objpra.systemId,
	        	username:Objpra.username, 
	        	modulIds:Objpra.modulIds,
	        	staDate:Objpra.staDate,
	        	endDate:Objpra.endDate,
	        	PageSta: CurPage, 
	        	PageSize:PageSize
	        	},//传给PHP的数据，多个参数用&连接
	        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
	        success: function (data)
	        {
	        	
	            layer.close(indexLoading);//关闭蒙板
	            if(IdenOnId(data,"查询操作日志")==true)//---------------------------------------------权限判断
	            {
		            var list=[];
		            var Tbodytable="";
		            if(data=="0~[" || data.split("~")[1]=="")//格式判断！
		            {
		            	Tbodytable +="<tr><td  colspan='9' >没有数据</td></tr>";
		            }else
		            {
		            	//---------------------------------------------------分页
						var Count=0;
						Count=data.split("~")[0];//总数
						$("#CountRows").text(Count);
						data=data.split("~")[1];//数据
						if(type==1 || type==2)
						{
							//初始化
							$("#ToPage").text(Math.ceil(Count/PageSize));
							$("#CurPage").val(CurPage);
							$("#CurPageTop").text(CurPage);
						}
						if(Number(CurPage)>Math.ceil(Count/PageSize))//防止当页没有数据时 
						{
							CurPage=Number(CurPage)-1;
							$("#CurPage").val(CurPage);
							$("#CurPageTop").text(CurPage);
							if(Count>0)
							{
								Select(CurPage,0);//重新查询！
							}
						}
						//---------------------------------------------------分页
			            list=eval(data);
			        	var Count=0;
			            for(var i=0;i<list.length;i++)
			            {
			            	Tbodytable +="<tr><td><input onclick='T_checkedClick(this)' type='checkbox' class='T_checked' lid='"+list[i].operaterecordId+"'/></td>";
			            	Tbodytable +="<td>"+(i+1)+"</td>";
			            	Tbodytable +="<td>"+list[i].systemmodularityname+"</td>";
			            	Tbodytable +="<td>"+list[i].systemname+"</td>";
			            	Tbodytable +="<td>"+list[i].username+"</td>";
			            	Tbodytable +="<td>"+list[i].explainshow+"</td>";
			            	Tbodytable +="<td><a href='javascript:' onclick='PerationDataShow("+list[i].operaterecordId+")'>详情</a></td>";
			            	Tbodytable +="<td>"+list[i].operatedate+"</td>";
			            	Tbodytable +="<td><a href='javascript:' onclick='PerationNoteShow("+list[i].loginId+",\""+list[i].username+"\")'>查看</a></td>";
			            	Tbodytable +="<td><button type='button' class='btn btn-warning btn-xs' onclick='DeleteOnClick("+list[i].operaterecordId+")' >删除</button></td></tr>";
			            }
		            }
		            
		            $("#Tbodytable").html(Tbodytable);
	            }
	            
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown)
	        {
	            layer.close(indexLoading);//关闭蒙板
	            layer.alert('网络错误！');
	        }
	    });
		
		
	}
}


function IdenDate(date)
{
	var date1=new Date(date);
	
	if(date1.toString()=="Invalid Date")
	{
		return "";
	}else
	{
		return date;
	}
}
//--------------------------------------------分页------------------

//首页

function Sta()
{
	//设置当前页数
	var CurPage=$("#CurPage").val();
	if(1!=Number(CurPage))
	{
		$("#CurPage").val(1);
		$("#CurPageTop").text(1);
		PageSelect(1,0);
	}

} 

//下一页
function Next()
{
	var CurPage=$("#CurPage").val();
	if(CurPage!=$("#ToPage").text())
	{
		$("#CurPage").val(Number(CurPage)+1);
		$("#CurPageTop").text(Number(CurPage)+1);
		PageSelect(Number(CurPage)+1,0);
	}
}

//上一页
function Last()
{
	var CurPage=$("#CurPage").val();
	if(1!=Number(CurPage) && 1<Number(CurPage))
	{
		$("#CurPage").val(Number(CurPage)-1);
		$("#CurPageTop").text(Number(CurPage)-1);
		PageSelect(Number(CurPage)-1,0);
	}
}

//尾页
function End()
{
	var CurPage=$("#CurPage").val();
	var ToPage=$("#ToPage").text();
	if(Number(CurPage)<Number(ToPage))
	{
	$("#CurPage").val(ToPage);
	$("#CurPageTop").text(ToPage);
	PageSelect(Number(ToPage),0);
	}
}

function onkeyupPage(obj) 
{
obj.value = obj.value.replace(/[^\d]/g, "");  //清除“数字”和“.”以外的字符  
var ToPage=$("#ToPage").text();
if(Number(obj.value)>Number(ToPage))
{
	obj.value=ToPage;
}
////Domain3.6.exe
}

//跳转单击
function skipPage() 
{//回车键
	if ($("#CurPage").val() == "")
	 {//判断跳转页数是否为空
	   $("#CurPage").val(1);
	   $("#CurPageTop").text(1);
	    return;
	 }
	$("#CurPageTop").text($("#CurPage").val());
	PageSelect(Number( $("#CurPage").val()),0);
}

//下拉选项更改事件
function DataListShow()
{
	var CurPageSize= $("#DataListShow").find("option:checked").val();
	PageSize=CurPageSize;//设置页码
	PageSelect(1,1);//重新刷新当前页
}

//删除数据---------------------------------------------------------------
function DeleteOnClick(id)//删除单条
{
	if(IdenOnPowerAndCode(userpower,"DeSAO","删除操作日志")==true)
	{	
		layer.confirm('确定删除该数据？一旦删除，不可恢复！', {
	        btn: ['确定', '取消'] //按钮
	    },function(){
		DeleteOnOpId(id+",","删除成功",1);
	    });
	}
}
function DeleteOnChecked()//删除多条
{
	if(IdenOnPowerAndCode(userpower,"DeSAO","删除操作日志")==true)
	{
	    var ids=$(".T_checked");
	    var where="";
	    var count=0;
	    for(var i=0;i<ids.length;i++)
	    {
	    	if(ids[i].checked==true)
	    	{
	    		where +=$(ids[i]).attr("lid")+",";	
	    		count++;
	    	}
	    }
	    if(count==0)
	    {
	    	layer.alert("至少选择一条数据");
	    }else
	    {
	    	layer.confirm("确定删除所选的"+count+"条数据？一旦删除，不可恢复！", {
	            btn: ['确定', '取消'] //按钮
	        },function(){
	        	DeleteOnOpId(where,"应删除"+count+"条，实际删除",2);
	        });
	    } 
	}
}


function DeleteOnWhere()//删除查询结果！
{
	if(IdenOnPowerAndCode(userpower,"DeSAO","删除操作日志")==true)
	{	
		layer.confirm('确定删除'+$("#CountRows").text()+'条数据?一旦删除，不可恢复！', {
	        btn: ['确定', '取消'] //按钮
	    },function()
	    {
	    	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
		    $.ajax({
		        type: 'post',//可选get
		        url: 'servlet/OperateJournal/OperateJournaServlet',//这里是接收数据的PHP程序
		        data: {type:"DeleteOnWhere",
		        	systemId:Objpra.systemId,
		        	username:Objpra.username, 
		        	modulIds:Objpra.modulIds,
		        	staDate:Objpra.staDate,
		        	endDate:Objpra.endDate
		        	},//传给PHP的数据，多个参数用&连接
		        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
		        success: function (data)
		        {
		        	layer.close(indexLoading);//关闭蒙板
		        	if(IdenOnId(data,"删除操作日志")==true)//---------------------------------------------权限判断
		        	{
			        	if(data=="NO"||data=="")
			        	{
			        		layer.alert("删除失败");
			        	}else
			        	{
			        		layer.alert("成功删除"+data+"条数据");
			        	}
			        	PageSelect($("#CurPage").val(),1);//重新刷新当前页
		        	}
		        },
		        error: function (XMLHttpRequest, textStatus, errorThrown)
		        {
		            layer.close(indexLoading);//关闭蒙板
		            layer.alert('网络错误！');
		        }
		    });
	    });
	}
	
}
//----------------------------------------删除数据之 通过ID 来删除数据
function DeleteOnOpId(str,mag,type)
{
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	//异步获取对应项目的管理员
	 $.ajax({
         type: 'post',//可选get
         url: 'servlet/OperateJournal/OperateJournaServlet',//这里是接收数据的PHP程序
         data: {type:"DeleteJournaOnId",where: str },//传给PHP的数据，多个参数用&连接
         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
         success: function (data)
         {
        	
             layer.close(indexLoading);//关闭蒙板
             if(IdenOnId(data,"删除操作日志")==true)//---------------------------------------------权限判断
            {
            	
            	 if(data=="NO" || data=="0" || data=="")
                 {
                	 layer.alert("删除失败");
                 }else
                 {
                	
                	 if(type==1)
                	 {
                		 layer.msg(mag);
                	 }else
                	 {
                		 layer.msg(mag+data+"条");
                	 }
                	 PageSelect($("#CurPage").val(),1);//重新刷新当前页
                 }
            }
             
         },
         error: function (XMLHttpRequest, textStatus, errorThrown)
         {
             layer.close(indexLoading);//关闭蒙板
             layer.alert('网络错误！');
         }
     });
}
