
var setting = 
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
         callback: {
             onCheck: onCheck1
         }
		};
$(function()
{
	
	$("#modulIds").click(function(){modulIdsClick();});
	$("#SystemTree").blur(function(){});
	$("#SystemTreeData").blur(function(){$("#SystemTree").hide();});
	//绑定树形
	DataSorceTree();
	
	$("body").bind("mousedown", onBodyDown);
});
function onBodyDown(e)//隐藏！
{
	if(e.target.id.indexOf("SystemTreeData") ==-1 && e.target.id.indexOf("SystemTree") ==-1)
	{
		$("#SystemTree").hide();
	}
}
//显示
function modulIdsClick()
{
	$("#SystemTree").show();
	$("#SystemTree").css("width",$($("#modulIds").parent()[0]).css("width"));
	$("#SystemTree").focusin();
}

function DataSorceTree()
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
	            	 $.fn.zTree.init($("#SystemTreeData"), setting, eval(data)); 
	            	//取消所有勾选
	            	 var treeObj = $.fn.zTree.getZTreeObj("SystemTreeData");
	            	 treeObj.checkAllNodes(false);
	            	 
	            }  
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown)
	        {
	            layer.close(indexLoading);//关闭蒙板
	            layer.alert('网络错误！');
	        }
	    });
	
//	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
//	$.ajax({
//        type: 'post',//可选get
//        url: 'servlet/OperateJournal/OperateJournaServlet',//这里是接收数据的PHP程序
//        data: {type:"SystemTreeShow"},//传给PHP的数据，多个参数用&连接
//        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
//        success: function (data) 
//        {
//        	
//            layer.close(indexLoading);//关闭蒙板
//            if(data!="")
//            {
//            	 $.fn.zTree.init($("#SystemTreeData"), setting, eval(data));
//            }  
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown)
//        {
//            layer.close(indexLoading);//关闭蒙板
//            layer.alert('网络错误！');
//        }
//    });

}


function onCheck1()//单击
{
	//遍历 所有的树形  得到 勾选的数据
	 var strTrue = "";
	 var strName="";
	    //遍历一个树,获取每个节点的选中状态
	    var treeObj = $.fn.zTree.getZTreeObj("SystemTreeData");
	    var nodes = treeObj.transformToArray(treeObj.getNodes());
	    for (var i = 0; i < nodes.length; i++) 
	    {
	        
	        if(nodes[i].checked==true)
	        {
	        	strTrue +=nodes[i].id + ",";
	        	strName +=nodes[i].name + ",";
	        }
	    }
	    $("#modulIds").val(strName.slice(0,strName.length-1));
	    $("#modulIds").attr("vid",strTrue);
}

