$(function()
{
$("#ShowAllSystem").click(function(){ShowAllSystem();});
$("#HiddenAllSystem").click(function(){HiddenAllSystem();});

$(".CurPlan").click(function(){Submit(this);});

});
function ShowAllSystem()
{	
	$("#ShowAllSystem").css("display","none");
	$(".AllSystem").css("display","block");
}
function HiddenAllSystem()
{
$("#ShowAllSystem").css("display","block");
$(".AllSystem").css("display","none");
}
function Submit(obj)
{
	var CurSystemId=$(obj).attr("number");
	
	
	if(CurSystemId!=0)
	{
		var username=$("#username").val();
		var password=$("#password").val();
	
		$.ajax({
		type:"post",
		url:"servlet/Login/LoginServlet",
		data:{username:username,password:password,systemmodul:CurSystemId},
		dataType:"text",
		success:function(data)
		{	
			
			if(data=="0")
			{
				layer.alert("网络错误");
			}else if(data=="6")
			{
				layer.alert("账号为空");
			}
			else if(data=="7")
			{
				layer.alert("密码为空");
			}
			else if(data=="8")
			{
				layer.alert("数据移除，请刷新页面！");
			}
			else if(data=="2")
			{
				layer.alert("账号错误");
			}
			else if(data=="3")
			{
				layer.alert("密码错误");
			}
			else if(data=="4")
			{
				layer.alert("账户不是正常状态，请联系管理员！");
			}
			else if(data=="5")
			{
				layer.alert("请到指定平台登陆");
			}
			else if(data=="1")
			{
				window.location.href="/PaintingAndCPScheme/jsp/Main/Main.jsp";
			}else
			{
				layer.alert("网络错误");
			}
		},
		error:function(Request,textStatus,error)
		{//�������
			layer.alert("网络错误");
		}
		});
		
	}
}