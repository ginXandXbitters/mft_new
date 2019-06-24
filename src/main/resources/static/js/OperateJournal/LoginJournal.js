
var userpower="";
$(function()
{	
	userpower=$("#userpower").val();
	
	$("#SystemModularity").change(function(){SystemModularityUpdate();});//通过不同的平台得到不同的用户类型
	
	$("#Btnselect").click(function(){PageSelect(0,2);});//查询单击
	
	$("#DeleteOnChecked").click(function(){DeleteOnChecked();});//删除多条
	
	$("#DeleteOnWhere").click(function(){DeleteOnWhere();});//删除查询结果
	
	$("#AllChecked").click(function(){AllCheckedClick();});//th 多选框单击
	
	$("#username").focus(function(){$(this).select();});//有焦点时   全选

	$("#CurPageDiv").focusin(function(){$("#CurPageDiv").css("margin-right","0px");$("#ShowCount").css("display","initial");});
	$("#CurPageDiv").focusout(function(){$("#CurPageDiv").css("margin-right","-38px");$("#ShowCount").css("display","none");});
	
	$(window).resize(function() {WindowsUpdateSize();});//浏览器改变大小时
	
	//分页
	$("#Sta").click(function(){Sta();});
	
	$("#Last").click(function(){Last();});
	
	$("#skipPage").click(function(){skipPage();});
	
	$("#Next").click(function(){Next();});
	
	$("#End").click(function(){End();});
	
	$("#DataListShow").change(function(){DataListShow();});
	
	PageSelect(0,2);//单击事件
});

//操作记录
function PperationNoteShow(id,name)
{
	if(IdenOnPowerAndCode(userpower,"SeOSAO","查看操作记录")==true)
	{
		$('#UserPowerModal').modal('show');//显示模态窗体
		$("#IF_ONote").attr("src","");
		$("#IF_ONote").attr("src","servlet/OperateJournal/OperateJournaServlet?type=OperationnNoteOnLoginId&loginId="+id);
		$("#Name_M").text(name);
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


function T_checkedClick(obj)//checked 单击事件
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
	}
	else
	{
		document.getElementById('AllChecked').checked=false;
	}
	
}


function SystemModularityUpdate()//得到对应平台的用户类型
{
	var CheckedNumber= $("#SystemModularity").find("option:checked").attr("number");
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	//layer.close(indexLoading);//关闭蒙板
	//异步获取对应项目的管理员
	 $.ajax({
         type: 'post',//可选get
         url: 'servlet/Main/MainServlet',//这里是接收数据的PHP程序
         data: {type:"GetUserType",systemmodularityId: CheckedNumber },//传给PHP的数据，多个参数用&连接
         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
         success: function (data)
         {
        	
             layer.close(indexLoading);//关闭蒙板
             if(IdenOnId(data,""))
         	{
	             var list=[];//存放数据的容器
	             var UserTypeHTML="<option number='0'>全部</option>";//要绑定下拉框的值
	             if(data!="")
	             {
	            	  list=eval(data);
	            	  for(var i=0;i<list.length;i++)
	                  {
	                 	 UserTypeHTML +="<option number='"+list[i].usertypeId+"'>"+list[i].usertypename+"</option>"
	                  }
	             }
	             $("#UserType").html(UserTypeHTML);
         	}
         },
         error: function (XMLHttpRequest, textStatus, errorThrown)
         {
             layer.close(indexLoading);//关闭蒙板
             layer.alert('网络错误！');
         }
     });

}

//浏览器改变大小时
function WindowsUpdateSize()
{
	
	var curWidth=Number($("html").css("width").replace("px",""));
	var tr =$("#UserData tr");
	if(curWidth<=780)
	{
		$( $(tr[0]).find("th")[2]).hide();
		$( $(tr[0]).find("th")[3]).hide();
		$( $(tr[0]).find("th")[5]).hide();
		for(var i=1;i<tr.length;i++)
		{
			$( $(tr[i]).find("td")[2]).hide();
			
			$( $(tr[i]).find("td")[3]).hide();
			
			$( $(tr[0]).find("td")[5]).hide();
		}
	}
	else
	{
		$( $(tr[0]).find("th")[2]).show();
		$( $(tr[0]).find("th")[3]).show();
		$( $(tr[0]).find("th")[5]).show();
		for(var i=1;i<tr.length;i++)
		{
			$( $(tr[i]).find("td")[2]).show();
			
			$( $(tr[i]).find("td")[3]).show();
			
			$( $(tr[i]).find("td")[5]).show();
		}
	} 

}
//------------------------------------------------------------------------------------查询🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃
var PageSize=5;//页码
var Objpra=new Object();//查询的参数
//CurPage 当前页码   type 是否增删数据！（ 1  为 重新绑定总页数   0表示分页跳转 2 单击查询！）
//分页查询
function PageSelect(CurPage,type)
{
	//判断是否有权限
	if(IdenOnPowerAndCode(userpower,"SeSAL","查看登陆日志")==true)
	{	 //usertypeId, name, stateId, PageSta, PageSize
		 document.getElementById('AllChecked').checked=false;//取消
		 var usertypeId=$("#UserType").find("option:checked").attr("number");
		 var username=$("#username").val();
		 var systemId=$("#SystemModularity").find("option:checked").attr("number"); //当前系统的ID
		 var staDate=IdenDate($("#staDate").val());//判断时间格式
		 var endDate=IdenDate($("#endDate").val());//判断时间格式
		 //验证当前时间是否是时间格式    否 的情况下就设置    ""
		 if(type==2)//查询单击
			{
				$("#CurPage").val(1);//设置当前页码
				$("#CurPageTop").text(1);
				CurPage=1;
				//保存条件
				Objpra.usertypeId=usertypeId;
				Objpra.username=username;
				Objpra.staDate=staDate;
				Objpra.endDate=endDate;
				//用于用户权限的显示条件
				Objpra.systemId=systemId;
			}
		 indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
		 $.ajax({
	        type: 'post',//可选get
	        url: 'servlet/OperateJournal/LoginJournalServlet',//这里是接收数据的PHP程序
	        data: {type:"SelectLoingData",
	        	usertypeId:Objpra.usertypeId,
	        	username:Objpra.username, 
	        	staDate:Objpra.staDate,
	        	endDate:Objpra.endDate,
	        	systemId:Objpra.systemId,
	        	PageSta: CurPage, 
	        	PageSize:PageSize,
	        	},//传给PHP的数据，多个参数用&连接
	        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
	        success: function (data)
	        {
	            layer.close(indexLoading);//关闭蒙板
	            if(IdenOnId(data,"查询登陆日志")==true)//---------------------------------------------权限判断
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
			            	Tbodytable +="<tr><td><input onclick='T_checkedClick(this)' type='checkbox' class='T_checked' lid='"+list[i].loginId+"'/></td>";
			            	Tbodytable +="<td>"+(i+1)+"</td>";
			            	Tbodytable +="<td>"+list[i].systemmodularityname+"</td>";
			            	Tbodytable +="<td>"+list[i].usertypename+"</td>";
			            	Tbodytable +="<td>"+list[i].username+"</td>";
			            	Tbodytable +="<td>"+list[i].ipaddr+"</td>";
			            	Tbodytable +="<td>"+list[i].logindate+"</td>";
			            	Tbodytable +="<td><a href='javascript:' onclick='PperationNoteShow("+list[i].loginId+")'>查看</a></td>";
			            	Tbodytable +="<td><button type='button' class='btn btn-warning btn-xs' onclick='DeleteOnClick("+list[i].loginId+")' >删除</button></td></tr>";
			            }
		            }
		            
		            $("#Tbodytable").html(Tbodytable);
		            WindowsUpdateSize();//更新
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

//时间格式验证  如果不是时间格式 赋值为"";

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



//删除数据---------------------------------------------------------------
function DeleteOnClick(id)//删除单条
{
	if(IdenOnPowerAndCode(userpower,"DeSAL","删除登陆日志")==true)
	{
		layer.confirm('确定删除该数据？一旦删除，不可恢复!', {
	        btn: ['确定', '取消'] //按钮
	    },function(){
		DeleteOnOpId(id+",","删除成功",1);
	    });
	}
	
	
}
function DeleteOnChecked()//删除多条
{
	if(IdenOnPowerAndCode(userpower,"DeSAL","删除登陆日志")==true)
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
	    	layer.confirm("确定删除所选的"+count+"条数据？一旦删除，不可恢复!", {
	            btn: ['确定', '取消'] //按钮
	        },function(){
	        	DeleteOnOpId(where,"应删除"+count+"条，实际删除",2);
	        });
	    } 
    
	}
}


function DeleteOnWhere()//删除查询结果！
{
	if(IdenOnPowerAndCode(userpower,"DeSAL","删除登陆日志")==true)
	{
		layer.confirm('确定删除'+$("#CountRows").text()+'条数据？一旦删除，不可恢复!', {
	        btn: ['确定', '取消'] //按钮
	    },function()
	    {
	    	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
		    $.ajax({
		        type: 'post',//可选get
		        url: 'servlet/OperateJournal/LoginJournalServlet',//这里是接收数据的PHP程序
		        data: {type:"DeleteOnWhere",
		        	usertypeId:Objpra.usertypeId,
		        	username:Objpra.username, 
		        	staDate:Objpra.staDate,
		        	endDate:Objpra.endDate,
		        	systemId:Objpra.systemId,
		        	},//传给PHP的数据，多个参数用&连接
		        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
		        success: function (data)
		        {
		        	layer.close(indexLoading);//关闭蒙板
		        	if(IdenOnId(data,"删除登陆日志")==true)//---------------------------------------------权限判断
		            {
			        	if(data=="NO"||data=="")
			        	{
			        		layer.alert("删除失败");
			        	}
			        	else
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
         url: 'servlet/OperateJournal/LoginJournalServlet',//这里是接收数据的PHP程序
         data: {type:"DeleteOnId",where: str },//传给PHP的数据，多个参数用&连接
         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
         success: function (data)
         {
             layer.close(indexLoading);//关闭蒙板
             if(IdenOnId(data,"删除登陆日志")==true)//---------------------------------------------权限判断
            {
	             if(data=="NO" || data=="0")
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
