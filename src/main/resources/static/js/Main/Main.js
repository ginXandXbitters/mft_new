	$(function()
	{
		//列单击时
		$(".titleText").click(function(){titleClick(this);});
		
		//浏览器改变大小时
		$(window).resize(function() {WindowsUpdateSize();});	
		
		//单击左上角时
		$("#ShowOrHidden").click(function (){ShowOrHiddenLeftWindows();});
		
		
		
		//titleUser  显示或 失去焦点时关闭
		$("#titleUser").click(function()
		{
		
			$("#titleUser").css("background","rgba(50, 82, 155, 0.39)");
			//显示窗体
			$("#UserData").show();
			$("#UserData").focus();
		});
		$("#UserData").blur(function()
		{
			$("#UserData").hide();
			$("#titleUser").css("background","");
		});
		
		//菜单栏失去焦点时
		$("#titleTop").blur(function()
		{
			$(".titleShow").css("height","39px");//关闭所有节点
			$("#titleTop").css("height","0px");
		});
		WindowsUpdateSize();//手动更新浏览器大小
		
	});
	function UserNameShow()
	{
		var nameHeight=Number($("#UserOnname").css("height").replace("px",""));
		
			if(nameHeight<=20)
			{
				if(nameHeight==0)
				{
					setTimeout(function(){UserNameShow();},10);
				}
				else
				{
				$("#UserOnname").css("line-height","27px");
				}
			}
			else
			{	
				$("#UserOnname").css("line-height","17px");
			}
	}
	
	
	//浏览器改变大小时
	function WindowsUpdateSize()
	{
			//左边菜单
			var curWidth=Number($("html").css("width").replace("px",""));
			
 			if(curWidth<=960)
 			{
 				$("#LeftMenu").css("display","none");//左边菜单栏
 				
 			}else
 			{
 				$("#LeftMenu").css("display","block");
 			} 						
 			//顶部菜单！
			if($("#titleTop").css("height")!="0px")
			{
					//设置菜单大小和 关闭单击区域的大小
					var CurTitleHeight=(Number($("html").css("height").replace("px",""))-66);
					$("#titleTop").css("height",CurTitleHeight+"px");
					$("#TitleCilck").css("height",(CurTitleHeight-350)+"px");
					if(curWidth>960)//大于浏览器宽度时关闭！
					{					
						$("#titleTop").css("height","0px");
					}
			}
			//用户栏
			if(curWidth<=960)
 			{
 				$("#ListUser").css("display","none");
 				$("#titleUser").css("display","block");
 				
 			}else
 			{
 				$("#ListUser").css("display","block");
 				$("#titleUser").css("display","none");
 			} 
 			
 			//标题栏
 			if(curWidth<=550)
 			{
 				$("#smallT").css("width","130px");
 				$("#SysText").text("URMP");
 				
 			}else
 			{
 			$("#smallT").css("width","330px");
 				$("#SysText").text("电信用户权限管理平台");
 			} 
 					
	}
	
	//标题单击事件
	function titleClick(obj)
	{
			//关闭所有节点
			$(".titleShow").css("height","39px");
			$(".spanRight").css("transform","rotate(0deg)");
		$(".spanRight").css("margin-right","12px");
		$(obj).find("span").css("margin-top","6px");
			//打开当前节点
			var count=$($(obj).next()).find("span").length;
			var curHeight=$($(obj).parent()).css("height");
			if(curHeight=="39px")
			{
				$($(obj).parent()).css("height",(40*(count+1)-1)+"px");
				//transform: rotate(90deg);
				
				$(obj).find("span").css("transform","rotate(90deg)");
				$(obj).find("span").css("margin-right","14px");
				$(obj).find("span").css("margin-top","8px");
			}else
			{
			$($(obj).parent()).css("height",(39)+"px");
			}
	}
	//左上角的 单击事件
	function ShowOrHiddenLeftWindows()
	{
		var curWidth=Number($("html").css("width").replace("px",""));//当前浏览器的宽度
		
			if(curWidth>=960)
			{
				var CurType=$("#LeftMenu").css("display");
				if(CurType=="none")
				{
				$("#LeftMenu").css("display","block");
				}else
				{
				$("#LeftMenu").css("display","none");
				}
			}else
			{
			
				var CurType=$("#titleTop").css("height");
			
				if(CurType=="0px")
				{
					$("#titleTop").css("height","350px");//设置焦点
					$("#titleTop").focus();//设置焦点
				}else
				{//关闭
				$("#titleTop").css("height","0px");
				}
			}
	}