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
                onClick: clickSelectMap
            }
        };
       var indexLoading ;//蒙板
       
   
var  PowerStr="";//用户权限组
 $(function () 
{     
    QueryModuleTreefalse(1);//绑定树形      
    $("#BtnUpdate").click(function(){BtnUpdateClick(this);}); 
    GetCurViewPower();//获取用户权限
});
//获取当前页面的用户所有的权限
 function GetCurViewPower()
 {
 	$.ajax({
         type: 'post',//可选get
         url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
         data: {type:"GetCurViewPowerOnType"},//传给PHP的数据，多个参数用&连接
         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
         success: function (data) 
         {
         	PowerStr=data;
         	if(PowerStr=="")
         	{
         		window.location.href="/PaintingAndCPScheme/jsp/Login/Erro.jsp";//不能直接写成  index.jsp
         	}
         },
         error: function (XMLHttpRequest, textStatus, errorThrown)
         {
             layer.close(indexLoading);//关闭蒙板
             layer.alert('网络错误！');
         }
     });
 }
//按钮单击事件
function  BtnUpdateClick(t)
{
	var count=PowerStr.split("UpSAT=")[1].split(";")[0];
	if(IdenOnId(count,"修改模块状态"))
	{
	var CurType= $(t).attr("CurType");
	if(CurType=="0")
	{
		$(t).text("保存模块状态");
		$(t).attr("CurType","1");
		$(t).addClass('btn-warning');
        $(t).removeClass('btn-primary');
        QueryModuleTreefalse(0);
	}
	else
	{
        //保存当前模块状态
        //保存修改状态
		layer.confirm('确定修改功能模块资料？', {
	        btn: ['确定', '取消'] //按钮
	    },function()
	    {
	    	 var ModulType=GetCheckedNode();//得到当前模块状态
	         $.ajax({
	             type: 'post',//可选get
	             url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
	             data: {type:"ModulInsertType",ModulType:ModulType},//传给PHP的数据，多个参数用&连接
	             dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
	             success: function (data) 
	             {
	                 layer.close(indexLoading);//关闭蒙板
	                 
	                 if(IdenOnId(data,"保存模块状态"))
	                 {
		                 if(data=="OK")
		                 {
		                 	layer.msg("修改成功");
		                 	$(t).attr("CurType","0");
		             		$(t).text("修改模块状态");
		             		$(t).addClass('btn-primary');
		                     $(t).removeClass('btn-warning');
		                 	QueryModuleTreefalse(1);
		                 }
		                 else
		                 {
		                 	layer.alert("保存失败！");
		                 }
	                 }
	             },
	             error: function (XMLHttpRequest, textStatus, errorThrown)
	             {
	                 layer.close(indexLoading);//关闭蒙板
	                 layer.alert('网络错误！');
	             }
	         });
	    	
	    	
	    },function()
	    {
	    	$(t).attr("CurType","0");
     		$(t).text("修改模块状态");
     		$(t).addClass('btn-primary');
             $(t).removeClass('btn-warning');
         	QueryModuleTreefalse(1);
	    	
	    });
	  }
	
	}
}
//得到当前模块状态
 function GetCheckedNode()
 {
	 var strTrue = "";
     var strFlase = "";
     //遍历一个树,获取每个节点的选中状态
     var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
     var nodes = treeObj.transformToArray(treeObj.getNodes());
     for (var i = 0; i < nodes.length; i++) 
     {
         
         if(nodes[i].checked==true)
         {
         	strTrue +=nodes[i].id + ",";
         	
         }else
         {
         	strFlase +=nodes[i].id + ",";
         } 
     }
     if(strTrue.length>1)
     {
     	strTrue=strTrue.substr(0,strTrue.length-1);
     }
     if(strFlase.length>1)
     {
     	strFlase=strFlase.substr(0,strFlase.length-1);
     }
     return strTrue+"~"+strFlase;	 
 }

function  QueryModuleTreefalse(type)//绑定数据
{
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
        data: {type:"UpdateSystemShow",Curtype:type},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data) 
        {
            layer.close(indexLoading);//关闭蒙板
            if(data!="")
            {
            	 $.fn.zTree.init($("#treeDemo"), setting, eval(data));
            	 SelectNode(1);
            }  
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
            layer.close(indexLoading);//关闭蒙板
            layer.alert('网络错误！');
        }
    });
}

//单击数节点
function clickSelectMap(event, treeId, treeNode, clickFlag)
{
	var TreeNodeid = treeNode.id;//获取ID
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
        data: {type:"getTreeNodeidOnId",TreeNodeid:TreeNodeid},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data) 
        {
            layer.close(indexLoading);//关闭蒙板
            if(data!="")
            {
            	var list=eval(data);
            	$("#id").val(list[0].id);
            	$("#remaks").val(list[0].remaks);
            	$("#code").val(list[0].code);
            	$("#name").val(list[0].name);
            	$("#rank").val(list[0].rank);
            } else
            {
            	layer.msg("加载数据失败");
            	
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
            layer.close(indexLoading);//关闭蒙板
            layer.alert('网络错误！');
        }
    });
}
//选中指定节点
function SelectNode(id)
{
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var node = treeObj.getNodeByParam("id", id, null);
    treeObj.selectNode(node);
    clickSelectMap(null, null, node,null);
}



