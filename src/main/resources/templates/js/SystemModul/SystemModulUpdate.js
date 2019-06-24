//树形参数
       var settingUpdate =
           {
               check: { enable: false, chkStyle: "radio", radioType: "all" },
           data: {
               simpleData: {
                   enable: true
               }
           },
           callback: {
               onClick: clickSelectMap
           }
       };
  var indexLoading;//蒙版
  var PowerStr="";
$(function () 
{              
    QueryModuleTreefalse(1);//绑定树形       
    
    //绑定事件
    $("#NodeUpdate").click(function(){NodeUpdate();});
    
    $("#NodeInsert").click(function(){NodeInsert();});
    
    $("#NodeDelete").click(function(){NodeDelete();});
    
    document.onkeydown = function (e)
    {
        var keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13)
        {
        	NodeUpdate();
        }
    };
    
    GetCurViewPower();//获得用户权限
    
});
//获取当前页面的用户所有的权限
function GetCurViewPower()
{
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
        data: {type:"GetCurViewPower"},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data) 
        {
        	layer.close(indexLoading);//关闭蒙板
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



function  QueryModuleTreefalse(id)//绑定数据
{
	 indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
        data: {type:"UpdateSystemShow"},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data) 
        {
        	
            layer.close(indexLoading);//关闭蒙板
            if(data!="")
            {
            	 $.fn.zTree.init($("#treeDemo"), settingUpdate, eval(data));
            	 //绑定初始值
            	 
            	 SelectNode(id);
            	 
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
	//得到当前节点信息！
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
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
            } 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
            layer.close(indexLoading);//关闭蒙板
            layer.alert('网络错误！');
        }
    });
	
}
//修改节点！
function NodeUpdate()
{
	var count=PowerStr.split("UpSAD=")[1].split(";")[0];
	if(IdenOnId(count,"修改模块信息"))
	{

    	var id=$("#id").val();
    	var remaks=$("#remaks").val();
    	var code=$("#code").val();
    	var name=$("#name").val();
    	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
    	$.ajax({
            type: 'post',//可选get
            url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
            data: {type:"NodeUpdate",id:id,remaks:remaks,code:code,name:name},//传给PHP的数据，多个参数用&连接
            dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
            success: function (data) 
            {
                layer.close(indexLoading);//关闭蒙板
                if(IdenOnId(data,"修改模块信息"))
                {
                	 if(data!="")
                     {
                     	if(data=="OK")
                     	{
                     		layer.msg("修改成功");	
                     		QueryModuleTreefalse(id);//重新绑定
                     		
                     	}else
                     	{
                     		layer.msg("修改失败");
                     	}
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
   

}
//删除节点！
function NodeDelete()
{
	var count=PowerStr.split("UpSAD=")[1].split(";")[0];
	if(IdenOnId(count,"删除模块信息"))
	{
	
	
	layer.confirm('确定删除该功能模块资料？', {
        btn: ['确定', '取消'] //按钮
    },function()
    {
    	var id=$("#id").val();
    	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
    	$.ajax({
            type: 'post',//可选get
            url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
            data: {type:"NodeDelete",id:id},//传给PHP的数据，多个参数用&连接
            dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
            success: function (data) 
            {
                layer.close(indexLoading);//关闭蒙板
                if(IdenOnId(data,"删除模块信息"))
                {
                if(data!="")
                {
                	if(data=="OK")
                	{
                		layer.msg("删除成功");	
                		QueryModuleTreefalse(1);//重新绑定
                	}else
                	{
                		layer.msg("删除失败");
                	}
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
}
//节点新增
function NodeInsert()
{
	var count=PowerStr.split("UpSAD=")[1].split(";")[0];
	if(IdenOnId(count,"新增模块信息"))
	{
	
	var rank=$("#rank").val();
	var fatherId=$("#id").val();
	var remaks=$("#remaks").val();
	var code=$("#code").val();
	var name=$("#name").val();
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/SystemModul/SystemModulServlet',//这里是接收数据的PHP程序
        data: {type:"NodeInsert",rank:rank,fatherId:fatherId,remaks:"",code:"",name:name},
        dataType: 'text',
        success: function (data)
        {
            layer.close(indexLoading);//关闭蒙板
            if(IdenOnId(count,"新增模块信息"))
            {
     
	            if(data!="")
	            {
	            	if(data=="NO")
	            	{
	            		layer.msg("新增失败");
	            	}else
	            	{
	            		layer.msg("新增成功");	
	            		QueryModuleTreefalse(Number(data));//重新绑定
	            	}
	            	
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
}
//通过ID 查找指定节点！
function SelectNode(id)
{
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var node = treeObj.getNodeByParam("id", id, null);
    treeObj.selectNode(node);
    clickSelectMap(null, null, node,null);
}
