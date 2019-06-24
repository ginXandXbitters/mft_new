<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:set  value="${pageContext.request.contextPath}" scope="page" var="ctx"></c:set>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用户新增</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	
	
	<script type="text/javascript" src="${ctx}/js/jquery-1.10.2.js"></script>
	<link rel="stylesheet" href="${ctx}/css/table.css" type="text/css"></link>
	<link rel="stylesheet" href="${ctx}/css/All.css" type="text/css"></link>	
	<link href="${ctx}/Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" /><!--bootstrap css样式-->
	<script src="${ctx}/Scripts/bootstrap/js/bootstrap.min.js"></script>
	
	 <script src="css/layer/layer.js"></script>
	 
	 <script type="text/javascript" src="js/User/UserUpdate.js"></script>
	 <script type="text/javascript" src="${ctx}/js/ErroShow.js"></script>
	 <style>
	 .myPadd
	 {
	 
	 padding-bottom:10px;
	 }
	 #form-control>*
	 {
	 	display:block;
	 	float:left;
	 }
	 #PasswordData
	 {
	 	padding: 0px;
	 	transition: all 0.2s linear;
	 }
	
	 option
	 {
	 padding:5px 0px;font-size:14
	 }
	 </style>
	 
	 <script type="text/javascript">
	  var oFReader = new FileReader();//图片数据
	  var OldFile=false;
	  var OldMyFile;
	 $(function()
	 {
	 	//绑定事件
	 	$("#ShowPassword").click(function(){ShowPassword();});
	 	
	 	
	 	
	 	 rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        oFReader.onload = function (evt) 
        	{
        		
                $("#Picture").attr('src', evt.target.result);//绑定文件控件的连接
            };
	 	 //图片单击
            $('#btnSelecPicture').click(function () {
                $("#filePicture").click();
            });
	 	
	 	 //文件控件更改事件
            $("#filePicture").change(function ()
             {
            
            	OldFile=false;
                var file = $('#filePicture').get(0).files[0];//转换
                if (file != undefined) 
                {
                    //加载到image标签中
                    if (!rFilter.test(file.type))
                     {//验证图片格式
                         layer.alert("选择的不是一个有效的图片文件");
                         $("#Picture").attr('src', '');//绑定文件控件的连接
                    }
                    else
                    {
	                     OldMyFile=file;
	                     oFReader.readAsDataURL(file);
	                     OldFile=true;
                    }
                }
                else
                {
	                 $('#filePicture').get(0).files[0]=OldMyFile;
	                 OldFile=true;
                }
            });
	 });
	 //显示修改密码！
	 function ShowPassword()
	 {
		 var curHeight=$("#PasswordData").css("height");
	 	if(curHeight=="1px")
	 	{
	 		$("#PasswordData").css("height","170px");
	 		$($("#ShowPassword").find("span")[1]).attr("class","glyphicon glyphicon-chevron-up");
	 		$($("#ShowPassword").find("span")[0]).text("收起");
	 		
	 	}else
	 	{
		 	$("#PasswordData").css("height","1px");
		 	$($("#ShowPassword").find("span")[1]).attr("class","glyphicon glyphicon-chevron-down");
		 	$($("#ShowPassword").find("span")[0]).text("更多");
		}
	 }
	 
	 function imgSubmit()
	 {
	 	//alert(OldFile);
	 	//var UpdateFile = $("#filePicture").get(0).files[0];
	 	//console.info(UpdateFile);
	 	//return OldFile;
	 	
	 		var UpdateFile = $("#filePicture").get(0).files[0];
	  		
	  		var name=UpdateFile.name;
	  		
	  		var formdata= new FormData();//实例化上传方法
	  			 			
	  		formdata.append("FileName",name);
	  			
	  		formdata.append("fileToUpload", UpdateFile);//赋值
	  			 
	  		var xhr= new XMLHttpRequest();
	  		
	  		xhr.addEventListener("load",function(){uploadComplete1(this,"1");} , false);
	  		
	  		xhr.addEventListener("error",function(){uploadFailed1(this,"2");} , false);
	  		
	  		xhr.open("POST", "servlet/UserUpdateServlet?type=ImgSubmit");
	  		
	  		xhr.send(formdata);
	 }
	 
	 function uploadComplete1(evt,type)
	 {
	 alert(type);
	 	console.info(evt.response);
	 }
	  function uploadFailed1(evt,type)
	 {
	 alert(type);
	 	console.info(evt.response);
	 }
	 function ifOldFIle()
	 {
	 	return OldFile;
	 }
	 
	 </script>
	
  </head>
  
  <body>
 <div class="container" style="padding-top:10px;">
 <input type="hidden" value="${type}" id="CurViewType"/>
 <input type="hidden" value="${userUpdate.userId}" id="userId"/>
  <input type="hidden" value="${userUpdate.usertypeId}" id="usertypeId"/>
    <div class="row" >
        <div class="col-xs-12 col-sm-9 myPadd" style="min-width:280px;padding-left:0px;">
        		<!---------------------------------------------------------------------------------------------基础信息 -->
    				 <div class="col-xs-12 col-sm-6 myPadd" >
		        		<div class="input-group">
									   <span class="input-group-addon">系统名称</span>
									  <select class="form-control"  id="SystemModularity" >
									  
									  <c:forEach items="${SystemModularitys}"  var="SystemModularity">
									  <option number="${SystemModularity.systemmodularityId}"  
										${SystemModularity.systemmodularityId== systemmodularityId?"selected='selected'":""}
									  >
									  		${SystemModularity.systemmodularityname}
									  </option>
									  </c:forEach>
									  </select>
						</div>
				     </div>
				     
	    			 <div class="col-xs-12 col-sm-6 myPadd">
		        		<div class="input-group">
									   <span class="input-group-addon">人员类型</span>
									   <select class="form-control" id="UserType">
									  </select>
						</div>
	       			 </div>
	       			 
    			     <div class="col-xs-12 col-sm-6 myPadd" >
			        		<div class="input-group">
										   <span class="input-group-addon"> &ensp; 昵称   &ensp;</span>
										  <input type="text" class="form-control" placeholder="" id="name" value="${userUpdate.name}">
							</div>
			         </div>
        
				       <div class="col-xs-12 col-sm-6 myPadd"  >
				        		<div class="input-group">
											   <span class="input-group-addon" style=""> &ensp; 性别   &ensp;</span>
											   <div class="form-control" id="form-control">
													  <input type="radio"  style="width:15px;height:15px"  ${userUpdate.sex==0?"":"checked='checked'"}  name="sex" id="SexB">
													  	<lable style="margin:3px 5px 0 5px" >男</lable>
													  <input type="radio" style="width:15px;height:15px"  name="sex"  ${userUpdate.sex==0?"checked='checked'":""} >
													  <lable style="margin:3px 5px 0 5px ">女</lable>
											  </div>
								</div>
				        </div>
				        
    					<div class="col-xs-12 col-sm-6 myPadd" >
				        		<div class="input-group">
											   <span class="input-group-addon">联系电话</span>
											  <input type="text" class="form-control" placeholder="" id="touchmuber"  value="${userUpdate.touchmuber}">
								</div>
				        </div>
				        
				         <div class="col-xs-12 col-sm-6 myPadd" >
				        		<div class="input-group">
											   <span class="input-group-addon"> &ensp; 状态   &ensp;</span>
											  <select id="state"  class="form-control">
												  <option number="1" ${userUpdate.stateId==1?"selected='selected'":""}>正常</option>
												  <option number="2" ${userUpdate.stateId==2?"selected='selected'":""}>删除</option>
												  <option number="3" ${userUpdate.stateId==3?"selected='selected'":""}>禁用</option>
												  <option number="4" ${userUpdate.stateId==4?"selected='selected'":""}>锁定</option>
											  </select>
								</div>
				        </div>
    			<!---------------------------------------------------------------------------------------------基础信息 -->
    			
        </div>
        <!-- --------------------------------------------------------------------------------------------------- 图片 -->
         <div class="col-xs-12 col-sm-3 myPadd" >
        		<div style="width:150px;height:170px; margin: auto;">
							<ul style="list-style:none;padding:0px;">
                                    <li style="list-style:none;padding:0px;margin-left:40px;"><span class="text-primary center-block">头像</span></li>
                                    <li style="list-style:none;padding:0px;"><img id="Picture" src="${ctx}/File/img/User/${userUpdate.imgpath}" style="background: #B6B6B6;height: 125px;width:110px;border:1px solid #337AB7;margin:0px auto;"></li>
                                    <li style="list-style:none;padding:0px;padding-top:5px;">
                                        <button type="button" id="btnSelecPicture" class="btn btn-primary btn-sm" style="border-radius:0px;margin-left:20px;">选择图片</button>
                                        <input name="filePicture" class="center-block" single="" type="file" style="display:none;" id="filePicture" accept="image/*"><!--multiple多选 single 单选-->
                                    </li>
                                </ul>
				</div>
        </div>
        
           <!-- --------------------------------------------------------------------------------------------------- 图片 -->
         <div class="col-xs-12 col-sm-9 myPadd"  style="min-width:280px">
        		<div class="input-group">
							   <span class="input-group-addon"> &ensp; 地址   &ensp;</span>
							  <input type="text" class="form-control" placeholder="" id="address"  value="${userUpdate.address}">
				</div>
        </div>
        
         <div class="col-xs-12 col-sm-12 myPadd"  style="min-width:280px">
        		<div class="input-group">
							   <span class="input-group-addon"> &ensp; 备注   &ensp;</span>
							  <input type="text" class="form-control" placeholder="" id="remarks"   value="${userUpdate.remarks}">
				</div>
        </div>
       <!-- ------------------------------------------------------------------------------------------------------更改密码 -->
			<div class="col-xs-12 col-sm-12 myPadd" style="padding-bottom:0px">
				<div class= "label label-primary" style="float:right;cursor:pointer;" id="ShowPassword">
				<span  style="color:#FFEFEF">更多</span>
				<!--glyphicon glyphicon-chevron-up  -->
				<span class="glyphicon glyphicon-chevron-down" id="GD_icon"></span>
				</div> 
			</div>
		<div 	class="col-xs-12 col-sm-12 myPadd" style="overflow: hidden;height:0px;" id="PasswordData">
			<acronym class="help-block" style="padding-left:15px;">用户安全</acronym>
			<div style="width:328px;height:130px;margin:auto;">
				<div class="col-xs-12 col-sm-12 myPadd" id="usernameF">
	        		<div class="input-group"  style="min-width:250px">
							<span class="input-group-addon">&ensp;账号&ensp;</span>
							<input type="text" class="form-control" id="username"  value="${userUpdate.username}">
					</div>
	        	</div>	
				 <div class="col-xs-12 col-sm-12 myPadd" id="passwordOldF">
	        		<div class="input-group"  style="min-width:250px">
								   <span class="input-group-addon">&ensp;原密码&ensp;</span>
								  <input type="password" class="form-control" placeholder="" id="passwordOld">
					</div>
	        	</div>		
	        	 <div class="col-xs-12 col-sm-12 myPadd">
	        		<div class="input-group"  style="min-width:250px">
								   <span class="input-group-addon">&ensp;&ensp;密  码&ensp;</span>
								  <input type="password" class="form-control" placeholder="" id="password">
					</div>
	        	</div>	
	        	<div class="col-xs-12 col-sm-12 myPadd">
	        		<div class="input-group"  style="min-width:250px">
								   <span class="input-group-addon">再次输入密码</span>
								  <input type="password" class="form-control" placeholder="" id="passwordIden">
					</div>
	        	</div>	
			</div>	
		</div>
		<!-- ---------------------------------------------------------------------------------------- 提交按钮 -->
		<div class="col-xs-12 col-sm-12 myPadd"  style="min-width:280px" >
		 	<div style="width:80px;margin:auto" id="btnPlan">
		 		<button type="button" class="btn btn-warning" id="Sumbit">添加</button>
		 		<button type="button" class="btn btn-success" id="Esc">返回</button>
		 	</div>
        </div>
         <!--
		<button type="button" class="btn btn-warning" id="imgSubmit" onclick="imgSubmit()">提交按钮</button>
		 -->
    </div>
</div>
    	
    	
    	
  </body>
</html>
