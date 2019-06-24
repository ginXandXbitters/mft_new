var indexLoading;//加载蒙板
var CurViewType;
$(function()
{
	//判断当前页面状态
	CurViewType=$("#CurViewType").val();
	if(CurViewType=="Insert")
	{
		//如果是新增页面--------------------------------------------隐藏原密码
		$("#passwordOldF").css("display","none");
		$("#passwordOldF").attr("disabled","disabled");
		//-----------------------------------------------隐藏原密码
		//--------------------------------隐藏返回按钮！
		$("#Esc").css("display","none");
		$("#Esc").attr("disabled","disabled");
		
		ShowPassword();//显示用户安全！！
		$("#Picture").attr("src","File/img/User/000.PNG");//设置图片路径为空
	}
	else if (CurViewType=="UpdateAll")//修改用户信息
	{
		$("#username").attr("disabled","disabled");//设置账户不可更改
		
		$("#btnPlan").css("width","120px");//设置按钮宽度
		
		$("#Sumbit").text("修改");//-----------更改按钮文字
		
		//-------------------------------------------隐藏原密码
		$("#passwordOldF").css("display","none");
		$("#passwordOldF").attr("disabled","disabled");
	}
	else if(CurViewType=="UpdatePri")
	{
		$("#btnPlan").css("width","120px");//设置按钮宽度
		
		$("#Sumbit").text("修改");//-----------更改按钮文字
		
		$("#usernameF").css("display","none");
		$("#usernameF").attr("disabled","disabled");
	}

	$("#SystemModularity").change(function(){SystemModularityUpdate(2);});//不同系统 不同的管理员类型
	
	
	$("#Sumbit").click(function(){Sumbit();});//提交单击事件
	
	$("#Esc").click(function(){Esc();});//退出单击事件
	
	SystemModularityUpdate(1);
});
//切换系统时 根据当前选中的系统来得到当前系统的用户类型
function SystemModularityUpdate(type)
{
	var  usertype=$("#usertypeId").val();
	var CheckedNumber= $("#SystemModularity").find("option:checked").attr("number");
	indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
	//layer.close(indexLoading);//关闭蒙板
	//异步获取对应项目的管理员
	 $.ajax({
         type: 'post',//可选get
         url: 'servlet/Main/MainServlet',//这里是接收数据的PHP程序
         data: {type:"GetUserType",systemmodularityId: CheckedNumber },//传给PHP的数据，多个参数用&连接
         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
         success: function (data) {
             layer.close(indexLoading);//关闭蒙板
             var list=[];//存放数据的容器
             var UserTypeHTML="";//要绑定下拉框的值
             if(data!="")
             {
            	  list=eval(data);
            	  for(var i=0;i<list.length;i++)
                  {
            		  var bool=false;
            		  if(type==1 && usertype==list[i].usertypeId)
            		  {
            			  bool=true;
            		  }
            		  if(bool==true)
            		  {
            			  UserTypeHTML +="<option selected='selected' number='"+list[i].usertypeId+"'>"+list[i].usertypename+"</option>";
            		  }else
            		  {
            			  UserTypeHTML +="<option  number='"+list[i].usertypeId+"'>"+list[i].usertypename+"</option>";
            		  }
                  }
             }
             $("#UserType").html(UserTypeHTML);
         },
         error: function (XMLHttpRequest, textStatus, errorThrown)
         {
             layer.close(indexLoading);//关闭蒙板
             layer.alert('网络错误！');
         }
     });

}
//提交
function Sumbit()
{
	//获取值 并验证
	
	var usertypeId=$("#UserType").find("option:checked").attr("number");//用户类型
	var name=$("#name").val();//昵称
	var sex=document.getElementById("SexB").checked==true?1:0;//性别
	var touchmuber=$("#touchmuber").val();//联系电话
	var state=$("#state").find("option:checked").attr("number");//状态
	var address=$("#address").val();//地址
	var remarks=$("#remarks").val();//备注 
	var username =$("#username").val();//账号
	var passwordOld =$("#passwordOld").val();//原密码
	var password=$("#password").val();//密码
	var passwordIden=$("#passwordIden").val();//密码验证
	
	//新增
	if(CurViewType=="Insert")
	{
		InsertUserUpdate(usertypeId,name,sex,touchmuber,
				state,address,remarks,username,password,passwordIden);
	}
	//修改用户信息
	
	if(CurViewType=="UpdateAll" || CurViewType=="UpdatePri")
	{
	
		UpdataUserUpdata(usertypeId,name,sex,touchmuber,
				state,address,remarks,password,passwordIden);
		
	}
}
//新增
function InsertUserUpdate(usertypeId,name,sex,touchmuber,
		state,address,remarks,username,password,passwordIden)
{
	if(name=="")
	{
		layer.msg("请填写用户昵称");
	}else if(username=="")
	{
		layer.msg("请填写用户账号");
	}
	else if(password=="")
	{
		layer.msg("请填写用户密码");
	}
	else if(password!=passwordIden)
	{
		layer.msg("两次输入的密码不相同");
	}else
	{
		indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
		 $.ajax({
	         type: 'post',//可选get
	         url: 'servlet/User/UserUpdateServlet',//这里是接收数据的PHP程序
	         data: {type:"InsertUserUpdate",
	        	 usertypeId:usertypeId,
	        	 name:name,
	        	 sex:sex,
	        	 touchmuber:touchmuber,
	        	 state:state,
	        	 address:address,
	        	 remarks:remarks,
	        	 username:username,
	        	 password:password
	        },//传给PHP的数据，多个参数用&连接
	         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
	         success: function (data)
	         {
	            layer.close(indexLoading);//关闭蒙板
	            
	            if(IdenOnId(data,"新增用户"))
	            {
		             var ID=0;
		             try{
		             ID=data.split("~")[1];
		             data=data.split("~")[0];
		             }catch(e){}
		             if(data=="OK" && ID!=0)
		             {
		            	 if(ifOldFIle()==true)
		            	 {
		            		 //上传图片
		            		 sumbitImg("新增",ID);
		            	 }else
		            	 {
		            		 layer.msg("新增成功");
		            	 }
		            	 clearInput();//清空
		            	 //window.location.href="servlet/MainServlet?type=UserUpdateShowInsert";
		             }else
			         {
		            	 if(data=="CF")
			             {
		            		 layer.alert("账号重复");
			             }else
			             {
			            	 layer.alert("新增失败");
			             }
		             }
	            }
	         },
	         error: function (XMLHttpRequest, textStatus, errorThrown) {
	             layer.close(indexLoading);//关闭蒙板
	             layer.alert('网络错误！');
	         }
	     });
	}
	
}

//修改
function UpdataUserUpdata(usertypeId,name,sex,touchmuber,
		state,address,remarks,password,passwordIden)
{
	var userId=$("#userId").val();
	if(name=="")
	{
		layer.msg("请填写用户昵称");
	}
	else if(password!=passwordIden)
	{
		layer.msg("两次输入的密码不相同");
	}else
	{
		indexLoading = layer.load(2, { shade: [0.3, '#D3D4D3'] });//打开加载蒙板
		 $.ajax({
	         type: 'post',//可选get
	         url: 'servlet/User/UserUpdateServlet',//这里是接收数据的PHP程序
	         data: {type:"UpdateUserUpdate",
	        	 usertypeId:usertypeId,
	        	 name:name,
	        	 sex:sex,
	        	 touchmuber:touchmuber,
	        	 state:state,
	        	 address:address,
	        	 remarks:remarks,
	        	 userId:userId,
	        	 password:password
	        },//传给PHP的数据，多个参数用&连接
	         dataType: 'text',//服务器返回的数据类型 可选XML ,Json jsonp script html text等
	         success: function (data)
	         {
	             layer.close(indexLoading);//关闭蒙板
	             if(IdenOnId(data,"修改用户基础信息"))
	             {
		             if(data=="OK")
		             {
		            	 if(ifOldFIle()==true)
		            	 {
		            		 //上传图片
		            		 sumbitImg("修改",userId);
		            	 }else
		            	 {
		            		 layer.msg("修改成功");
		            	 }
		            	 //window.location.href="servlet/MainServlet?type=UserUpdateShowInsert";
		             }else
		             {
		            	 layer.alert("修改失败");
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

//上传图片
function sumbitImg(type,userId)
	{
		    var UpdateFile = $("#filePicture").get(0).files[0];
	  		
	  		var name=UpdateFile.name;
	  		
	  		var formdata= new FormData();//实例化上传方法
	  			 			
	  		formdata.append("FileName",name);
	  			
	  		formdata.append("fileToUpload", UpdateFile);//赋值
	  			 
	  		var xhr= new XMLHttpRequest();
	  		
	  		xhr.addEventListener("load", function(){uploadComplete(this,type);}, false);
	  		
	  		xhr.addEventListener("error", function(){uploadFailed();}, false);
	  		
	  		xhr.open("POST", "servlet/User/UserUpdateServlet?type=ImgSubmit&userId="+userId);
	  		
	  		xhr.send(formdata);
	  		
	  		//显示进度条设置最大值
	   	
	}
//上传成功！
function uploadComplete(e,type)
{
	if(e.response=="OK")
	{
		layer.msg(type+"成功");
	}else
	{
		if(e.response="big")
		{
			layer.alert("信息保存成功，图片未上传成功！图片名称格式不正确");
		}
		else
		{
		layer.alert("信息保存成功，图片未上传成功");
		}
	}
}
//上次失败
function uploadFailed()
{
	layer.alert("信息保存成功，图片未上传成功");
}





function clearInput()
{
	$("#name").val("");//昵称
	$("#touchmuber").val("");//联系电话
	$("#address").val("");//地址
	$("#remarks").val("");//备注 
	$("#username").val("");//账号
	$("#passwordOld").val("");//原密码
	$("#password").val("");//密码
	$("#passwordIden").val("");//密码验证
	$("#Picture").attr("src","File/img/User/000.PNG");//设置图片路径为空
}
function Esc()
{
	window.parent.UserEsc();	
}



