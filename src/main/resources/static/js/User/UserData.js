var indexLoading;//加载蒙板
$(function()
{
	$("#SystemModularity").change(function(){SystemModularityUpdate();});

	$("#Btnselect").click(function(){PageSelect(0,2);});
	
	$("#name").focus(function(){$(this).select();});//有焦点时   全选

	$("#CurPageDiv").focusin(function(){$("#CurPageDiv").css("margin-right","0px");$("#ShowCount").css("display","initial");});
	$("#CurPageDiv").focusout(function(){$("#CurPageDiv").css("margin-right","-38px");$("#ShowCount").css("display","none");});
			
	//浏览器改变大小时
	$(window).resize(function() {WindowsUpdateSize();});	
	//分页
	$("#Sta").click(function(){Sta();});
	
	$("#Last").click(function(){Last();});
	
	$("#skipPage").click(function(){skipPage();});
	
	$("#Next").click(function(){Next();});
	
	$("#End").click(function(){End();});
	
	$("#DataListShow").change(function(){DataListShow();});

	//权限保存单击事件
	$("#UserPowerInser").click(function(){UserPowerInserClick();});
	
	$("#UserPowerEsc").click(function(){UserPowerEsc();});
	
	PageSelect(0,2);//单击事件 
});

//切换系统时 根据当前选中的系统来得到当前系统的用户类型
function SystemModularityUpdate()
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
        	 if(IdenOnId(data,""))
        	{
	             layer.close(indexLoading);//关闭蒙板
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

var PageSize=5;//页码
var Objpra=new Object();//查询的参数
//CurPage 当前页码   type 是否增删数据！（ 1  为 重新绑定总页数   0表示分页跳转 2 单击查询！）
//分页查询
function PageSelect(CurPage,type)
{
	 //usertypeId, name, stateId, PageSta, PageSize
	
	 var usertypeId=$("#UserType").find("option:checked").attr("number");
	 var name=$("#name").val();
	 var stateId=$("#state").find("option:checked").attr("number");
	 var SystemId=$("#SystemModularity").find("option:checked").attr("number"); //当前系统的ID

	 if(type==2)//查询单击
		{
			$("#CurPage").val(1);//设置当前页码
			$("#CurPageTop").text(1);
			CurPage=1;
			//保存条件
			Objpra.usertypeId=usertypeId;
			Objpra.name=name;
			Objpra.stateId=stateId;
			//用于用户权限的显示条件
			Objpra.systemId=SystemId;
		}
	 indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	 $.ajax({
        type: 'post',//可选get
        url: 'servlet/User/UserDataServlet',//这里是接收数据的PHP程序
        data: {type:"SelectUserData",usertypeId:Objpra.usertypeId, name:Objpra.name, stateId:Objpra.stateId,PageSta: CurPage, PageSize:PageSize,SystemId:SystemId},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data)
        {
            layer.close(indexLoading);//关闭蒙板
            if(IdenOnId(data,"查询用户")==true)//---------------------------------------------权限判断
            {
	            var list=[];
	            var Tbodytable="";
	            if(data=="0~[" || data.split("~")[1]=="")//格式判断！
	            {
	            	Tbodytable +="<tr><td  colspan='8' >没有数据</td></tr>";
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
		            	Tbodytable +="<tr>";
		            	Tbodytable +="<td>"+(i+1)+"</td>";
		            	Tbodytable +="<td><button type='button' class='btn btn-warning btn-xs' onclick='UserUpdateClick("+list[i].userId+")'>修改</button></td>";
		            	Tbodytable +="<td><a href=\"javascript:\" onclick=\"PowerUpdateClick("+list[i].userId+",'"
		            	+list[i].systemmodularityname+"','"+list[i].usertypename+"','"+list[i].name+"')\">设置</a></td>";
		            	Tbodytable +="<td>"+list[i].systemmodularityname+"</td>";
		            	Tbodytable +="<td>"+list[i].usertypename+"</td>";
		            	Tbodytable +="<td>"+list[i].name+"</td>";
		            	Tbodytable +="<td>"+list[i].statename+"</td>";
		            	Tbodytable +="<td>"+list[i].touchmuber+"</td>";
		            	Tbodytable +="</tr>";
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

//单击权限设置
function PowerUpdateClick(userId,sysname,type,name)
{

	$("#SystemName_M").text(sysname);
	$("#UserTypeName_M").text(type);
	$("#userName_M").text(name);
	
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	 $.ajax({
        type: 'post',//可选get
        url: 'servlet/User/UserUpdateServlet',//这里是接收数据的PHP程序
        data: {type:"UserpowerPower"},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data)
        {
       	 layer.close(indexLoading);//关闭蒙板
       	 if(IdenOnId(data,"设置用户权限")==true)
       	 {
       		 if(data=="UserpowerPower")
       		 {
       			$('#UserPowerModal').modal('show');//显示模态窗体
	       		 $("#CurUserId").val(userId);  //设置用户ID 
	       		//绑定--------------------------------------------在最下面
	       		TreeSource(userId);
       		 }
       		 else
       		 {
       			 layer.alert("呵呵，此路不通")
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

function UserPowerEsc()
{
	$('#UserPowerModal').modal('hide');//显示模态窗体
}


//单击修改用户信息
function UserUpdateClick(userId,systemId)
{
	//$("#myView").attr("src","")
	 //window.parent.hrefOnStr("servlet/MainServlet?type=UserUpdateShowUpdate&userId="+userId+"&UpdateType=UpdateAll");
	
	//判断当前用户是否有修改用户的权限
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	 $.ajax({
         type: 'post',//可选get
         url: 'servlet/User/UserUpdateServlet',//这里是接收数据的PHP程序
         data: {type:"UserUpdatePower"},//传给PHP的数据，多个参数用&连接
         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
         success: function (data)
         {
        	 layer.close(indexLoading);//关闭蒙板
        	 if(IdenOnId(data,"修改用户信息")==true)
        	 {
        		 if(data=="UserUpdatePower")
        		 {
        			$("#myView").css("display","block");
         			$("#myView").attr("src","servlet/Main/MainServlet?type=UserUpdateShowUpdate&userId="+userId+"&UpdateType=UpdateAll");
         			window.parent.SetTitle("用户列表   > 修改用户");
        		 }
        		 else
        		 {
        			 layer.alert("呵呵，此路不通")
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
function UserEsc()
{
	$("#myView").css("display","none");
	$("#myView").attr("src","");
	PageSelect($("#CurPage").val(),1);//重新刷新当前页
	window.parent.SetTitle("用户列表");
}

//浏览器改变大小时
function WindowsUpdateSize()
{
	var curWidth=Number($("html").css("width").replace("px",""));
	var tr =$("#UserData tr");
	if(curWidth<=550)
	{
		$( $(tr[0]).find("th")[3]).hide();
		$( $(tr[0]).find("th")[6]).hide();
		$( $(tr[0]).find("th")[7]).hide();
		for(var i=1;i<tr.length;i++)
		{
			$( $(tr[i]).find("td")[3]).hide();
			
			
			$( $(tr[i]).find("td")[6]).hide();
			
			
			$( $(tr[i]).find("td")[7]).hide();
		}
	}
	else
	{
		$( $(tr[0]).find("th")[3]).show();
		$( $(tr[0]).find("th")[6]).show();
		$( $(tr[0]).find("th")[7]).show();
		for(var i=1;i<tr.length;i++)
		{
			
			$( $(tr[i]).find("td")[3]).show();
			
		
			$( $(tr[i]).find("td")[6]).show();
			
			
			$( $(tr[i]).find("td")[7]).show();
			
		}
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


//权限分配-------------------------------------------------------------------------权限分配

//绑定树形
//树形参数
var setting = {
    check: {
        enable: true,
        chkDisabledInherit: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
    	right: function(){alert(11);}
    }
};


//通过用户ID 绑定用户权限列表
function TreeSource(userId)
{
	
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/User/UserDataServlet',//这里是接收数据的PHP程序
        data: {type:"GetUserPowerOnId",userId:userId},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data) 
        {
        
            layer.close(indexLoading);//关闭蒙板
            if(data!="")
            {
            	 $.fn.zTree.init($("#treeDemo"), setting, eval(data));
            	 ShowNodeOnId();//显示节点
            }else
            {
            	layer.alert("网络错误");
            	
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
            layer.close(indexLoading);//关闭蒙板
            layer.alert('网络错误！');
        }
    });
}

//权限保存单击事件
function UserPowerInserClick()
{
	layer.confirm('确定修改该用户权限？', {
        btn: ['确定', '取消'] //按钮
    },function()
    {
    	var UserPower=GetCheckedNode();
    	var userId=$("#CurUserId").val();
    	$.ajax({
            type: 'post',//可选get
            url: 'servlet/User/UserDataServlet',//这里是接收数据的PHP程序
            data: {type:"InserUserPower",power:UserPower,userId:userId},//传给PHP的数据，多个参数用&连接
            dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
            success: function (data) 
            {
            	if(IdenOnId(data,"保存用户权限"))
            	{
	            	if(data=="OK")
	            	{
	            		layer.msg("保存成功");	
	            	}
	            	else
	            	{
	            		layer.msg("保存失败");	
	            	}
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

//得到当前选中的模块
function GetCheckedNode()
{
	 var strTrue = ",";
    //遍历一个树,获取每个节点的选中状态
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.transformToArray(treeObj.getNodes());
    for (var i = 0; i < nodes.length; i++) 
    {
        
        if(nodes[i].checked==true)
        {
        	strTrue +=nodes[i].id + ",";
        	
        }
    }
   
    return strTrue; 
}
function ShowNodeOnId()
{
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getNodesByParam("pId", null, null);
    treeObj.hideNodes(nodes);
    
    var node = treeObj.getNodeByParam("id", Objpra.systemId, null);
    treeObj.showNode(node);
}


