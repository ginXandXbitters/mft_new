 var settingUserType =
  {
      check: { enable: false, chkStyle: "radio", radioType: "all" },
  data: {
      simpleData: {
          enable: true
      }
  },
  callback: {
      onClick: settingUserTypeclick
  }
};
var indexLoading ;//蒙板

var settingUserTypePower =
{
	    check: {
	        enable: true,
	        chkDisabledInherit: true
	    },
	    data: {
	        simpleData: {
	            enable: true
	        }
	    },
	};

$(function()
{
	GetUserType();//加载用户类型！
	
$("#BtnInsertPower").click(function(){InserUserPower();});
$("#BtnInsertType").click(function(){InsertUserType();});

	
});
//加载用户类型！
function GetUserType()
{
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/User/UserTypeServlet',//这里是接收数据的PHP程序
        data: {type:"GetUserTypePower"},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data) 
        {
            layer.close(indexLoading);//关闭蒙板
            if(data!="")
            {
            		$.fn.zTree.init($("#SystemType"), settingUserType, eval(data));
            		//默认选中
            		var treeObj = $.fn.zTree.getZTreeObj("SystemType");
            		var node = treeObj.getNodeByParam("id", 1, null);
            		settingUserTypeclick(null,null,node,null);
            		treeObj.selectNode(node);
            }
            else
            {
            	layer.alert("加载数据失败！")
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
            layer.close(indexLoading);//关闭蒙板
            layer.alert('网络错误！');
        }
    });
}

//通过当前用户类型的到权限列表
function GetUserTypePowerOnId(usertypeId,pId)
{
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/User/UserTypeServlet',//这里是接收数据的PHP程序
        data: {type:"GetUserTypePowerOnId",usertypeId:usertypeId},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data) 
        {
            layer.close(indexLoading);//关闭蒙板
            if(data!="") 
            {
            	 $.fn.zTree.init($("#ModulPower"), settingUserTypePower, eval(data));
            	 ShowNodeOnId(pId);
            }
            else
            {
            	layer.alert("加载数据失败！")
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
            layer.close(indexLoading);//关闭蒙板
            layer.alert('网络错误！');
        }
    });
}

//修改用户类型的默认权限
function  InserUserPower()
{
	
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	 $.ajax({
       type: 'post',//可选get
       url: 'servlet/User/UserTypeServlet',//这里是接收数据的PHP程序
       data: {type:"InserUserPowerIden"},//传给PHP的数据，多个参数用&连接
       dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
       success: function (data)
       {
      	 layer.close(indexLoading);//关闭蒙板
      	 if(IdenOnId(data,"修改用户默认权限")==true)
      	 {
      		 if(data=="InserUserPowerIden")//验证是否为当前请求发出的
      		 {			
      			layer.confirm('确定修改该用户类型权限？', {
      		        btn: ['确定', '取消'] //按钮
      		    },function()
      		    {
      		    	var UserPower=GetCheckedNode();
      		    	var usertypeId=$("#usertypeId").val();
      		    	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
      		    	$.ajax({
      		            type: 'post',//可选get
      		            url: 'servlet/User/UserTypeServlet',//这里是接收数据的PHP程序
      		            data: {type:"InsertUserTypePower",power:UserPower,usertypeId:usertypeId},//传给PHP的数据，多个参数用&连接
      		            dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
      		            success: function (data) 
      		            {
      		            	layer.close(indexLoading);//关闭蒙板
      		            	if(IdenOnId(data,"修改用户类型")==true)
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

//单击树形
function settingUserTypeclick(event, treeId, treeNode, clickFlag)
{
	if(treeNode.rank==1)//1 为子节点！
	{
		$("#TitleSys").text(treeNode.getParentNode().name);//父节点！
		$("#TitleType").text(treeNode.name);
		var id= treeNode.id.split("~")[0];
		GetUserTypePowerOnId(id,treeNode.pId);//得到当前用户类型所有的权限！  控制只显示对应平台的权限！
		$("#UserTypePower").css("display","block");
		$("#InsertUserType").css("display","none");
		$("#usertypeId").val(id);//保存ID
	}else
	{//单击父节点时
		var id= treeNode.id;
		$("#usertypeId").val(id);//保存ID
		$("#TitleSys").text(treeNode.name);
		$("#TitleType").text("添加用户类型");
		$("#UserTypePower").css("display","none");
		$("#InsertUserType").css("display","block");
	}
}
//新增用户类型
function InsertUserType()
{
	
	//权限判断！
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	 $.ajax({
        type: 'post',//可选get
        url: 'servlet/User/UserTypeServlet',//这里是接收数据的PHP程序
        data: {type:"InsertUserTypePowerIden"},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data)
        {
       	 layer.close(indexLoading);//关闭蒙板
       	 if(IdenOnId(data,"添加用户类型")==true)
       	 {
       		 if(data=="InsertUserTypePowerIden")
       		 {
	       			layer.confirm('确定添加该用户类型权限？', {
	       		        btn: ['确定', '取消'] //按钮
	       		    },function(){
	       			var systemId =$("#usertypeId").val();
	       			var typename=$("#usertype").val();
	       			indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	       			$.ajax({
	       		        type: 'post',
	       		        url: 'servlet/User/UserTypeServlet',
	       		        data: {type:"InsertUserType",systemId:systemId,typename:typename},
	       		        dataType: 'text',
	       		        success: function (data) 
	       		        {
	       		        	layer.close(indexLoading);//关闭蒙板
	       		        	if(IdenOnId(data,"添加用户类型")==true)
	       		        		{
	       		        			if(data=="OK")
			       		        	{
			       		        		layer.msg("新增成功");	
			       		        		GetUserType();//加载用户类型！
			       		        		$("#usertype").val("");
			       		        	}
			       		        	else
			       		        	{
			       		        		layer.alert("新增失败");	
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



//得到当前选中的模块
function GetCheckedNode()
{
	 var strTrue = ",";
    //遍历一个树,获取每个节点的选中状态
    var treeObj = $.fn.zTree.getZTreeObj("ModulPower");
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



//只显示指定节点
function ShowNodeOnId(id)
{
    var treeObj = $.fn.zTree.getZTreeObj("ModulPower");
    var nodes = treeObj.getNodesByParam("pId", null, null);
    treeObj.hideNodes(nodes);
    
    var node = treeObj.getNodeByParam("id", id, null);
    treeObj.showNode(node);
}