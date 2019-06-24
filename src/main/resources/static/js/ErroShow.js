//错误判断
function IdenOnId(id,tpye)
{
	var bool=true;
	 if(id=="2")
	{
		layer.alert(tpye+"模块未启用");
		bool=false;
	}
	else if(id=="3")
	{
		layer.alert("当前用户没有"+tpye+"模块权限");
		bool=false;	
	}
	else if(id=="4")
	{
		layer.alert("数据错误，请联系管理员");
		bool=false;
	}
	else if( id.indexOf("<html>")!=-1)
	{
		layer.alert("网络中断，请重新刷新");
		bool=false;
	}
	return bool;
}

//通过权限 和当前功能代码 得到错误判断

function IdenOnPowerAndCode(power,code,type)
{
	var bool=true;
	try{
		var count=power.split(code+"=")[1].split(",")[0];
		if(IdenOnId(count,type)==false)
		{
			bool=false;
		}
	}catch(e)
	{
		layer.alert("数据错误，请重新刷新页面");
		bool=false;
	}
	return bool;
}

