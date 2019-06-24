$(function()
{
	//加载单击事件
	$(".span1").click(function(){TitleOnclick(this);});
	//判断当前用户信息！是否有权限登陆😂😂😂😂😂😂
	IdenUser(1);//
	
});
function IdenUser(type)//个人资料更新时也调用
{
		
	$.ajax({
        type: 'post',//可选get
        url: 'servlet/Main/MainServlet',//这里是接收数据的PHP程序
        data: {type:"IdenUser"},//传给PHP的数据，多个参数用&连接
        dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
        success: function (data)
        {
        	var bool=false;
        	
            if(data!="")
            {
            	try{
            	
            	var	name=data.split("~")[0];//用户昵称
            	var Count1=data.split("~")[1];//用户权限判断!
            	var URl=data.split("~")[2];//
            	$("#UserOnImgPath").attr("src","/PaintingAndCPScheme/File/img/User/"+URl);
            	$("#UserOnname").text(name);
            	$("#UserOnImgPath1").attr("src","/PaintingAndCPScheme/File/img/User/"+URl);
            	$("#UserOnname1").text(name);
           
            	//控制用户昵称的显示方式
        		UserNameShow();
        		
            	if(IdenOnId(Count1,"权限管理平台"))
            	{
            		if(Count1=="1")
            		{
            			if(type==1)
                		{
                			HomeShow();//显示首页
                		}
                		bool=true;
            		}    		
            	}
            	}catch(e){}
            }
         
            if(bool==false)
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
//导航栏单击事件
function TitleOnclick(title)
{
	 if($("#myViewUser").attr("src")!="")
	 {
		 UserEsc();
	 }
	 var CurClickT=$(title).text();
	
	 if(CurClickT=="新增用户")
	 {
		 $("#myView").attr("src","servlet/Main/MainServlet?type=UserUpdateShowInsert");
		 $("#CurView").text("新增用户");
		 $("#titleTop").css("height","0px");
	 }
	 else if(CurClickT=="用户列表")
	 {
		 $("#myView").attr("src","servlet/Main/MainServlet?type=UserDataShow");
		 $("#CurView").text("用户列表");
		 $("#titleTop").css("height","0px");
	 }else if(CurClickT=="模块信息")
	 {
		 $("#myView").attr("src","servlet/Main/MainServlet?type=SystemModulUpdateShow");
		 $("#CurView").text("模块信息");
		 $("#titleTop").css("height","0px");
	 }
	 else if(CurClickT=="模块状态")
	 {
		 
		 $("#myView").attr("src","servlet/Main/MainServlet?type=SystemModulShow");
		 $("#CurView").text("模块状态");
		 $("#titleTop").css("height","0px");
	 }
	 else if(CurClickT=="权限分组")
	 {
		 $("#myView").attr("src","servlet/Main/MainServlet?type=UserTypePowerShow");
		 $("#CurView").text("权限分组");
		 $("#titleTop").css("height","0px");
	 }
	 else if(CurClickT=="登陆日志")
	 {
		 $("#myView").attr("src","servlet/Main/MainServlet?type=OperateJournalLoginShow");
		 $("#CurView").text("登陆日志");
		 $("#titleTop").css("height","0px");
	 }
	 else if(CurClickT=="操作日志")
	 {
		 $("#myView").attr("src","servlet/Main/MainServlet?type=OperateJournaShow");
		 $("#CurView").text("操作日志");
		 $("#titleTop").css("height","0px");
	 }
	 
}
//跳转事件
function hrefOnStr(src)
{
	$("#myView").attr("src",src);//跳转到新增用户页面！
}


//设置导航栏
function SetTitle(str)
{
	$("#CurView").text(str);
}

//设置为空  回到上一个页面！
var  OldTitle="";
function UserEsc()
{//个人信息修改！的返回按钮
	$("#myViewUser").css("display","none");
	$("#myViewUser").attr("src","");
	$("#CurView").text(OldTitle);
	IdenUser(2);
	$("#UserOnname").css("line-height","17px");
}
//个人资料！
function UserDataShow()
{
	if($("#CurView").text()!="个人资料")
	{
		OldTitle=$("#CurView").text();
	}
	$("#myViewUser").attr("src","servlet/Main/MainServlet?type=UserUpdateShowUpdate&UpdateType=UpdatePri");
	$("#CurView").text("个人资料");
	$("#myViewUser").css("display","block");
}

//注销登陆
function DisEsc()
{
	
	layer.confirm('确定注销登陆？', {
        btn: ['确定', '取消'] //按钮
    },function(){
	
	 $.ajax(
			 {
         type: 'post',//可选get
         url: 'servlet/Main/MainServlet',//这里是接收数据的PHP程序
         data: {type:"DisEsc"},//传给PHP的数据，多个参数用&连接
         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
         success: function (data)
         {      
            	 window.location.href="/PaintingAndCPScheme/jsp/Login/login.jsp";
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) 
         {
             layer.close(indexLoading);//关闭蒙板
             layer.alert('网络错误！');
         }
         
     });
	 
    });
}
//显示首页
function HomeShow()
{
	$("#myView").attr("src","/PaintingAndCPScheme/jsp/Main/Histogram.jsp");
	$("#CurView").text("");
}
