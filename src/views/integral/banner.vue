<template>
  <div class="warp">
    <div class="header">
      <h3>
        <span></span>BANNER管理
        <el-button @click="add">+</el-button>
      </h3>
    </div>
    <div class="main">
      <el-table :data="tableData" row-key="id" v-loading="loading" stripe style="width: 100%">
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.idx }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img v-bind:src=" scope.row.img " alt>
          </template>
        </el-table-column>
        <el-table-column label="连接" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.url}}
              <!-- <span @click="shang(scope.$index, scope.row)"><svg-icon icon-class="shang" v-show="scope.$index!=0"/></span>
              <span @click="xia(scope.$index, scope.row)"><svg-icon icon-class="xia" v-show="scope.$index!=tableData.length-1"/></span> -->
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="edit(scope.$index, scope.row)" type="primary" size="small">修改</el-button>
            <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column align="right" width="80" :render-header="renderHeader">
          <template slot="header" slot-scope="scope"></template>
        </el-table-column> -->
      </el-table>
      <!-- 图片添加 -->
      <el-dialog :visible.sync="addVisible" width='50%' title="添加图片">
				<div class="edit">
          <div class="box">
            <div class="left">
              <span>连接</span>
            </div>
            <div class="right">
              <el-input
                v-model="addData.url"
                placeholder
                style="width: 200px;"
              ></el-input>
            </div>
          </div>
          <!-- :on-progress="uploadVideoProcess" -->
          <div class="box">
            <div class="left">
              <span>图片</span>
            </div>
            <div class="right">
              <el-upload
                class="avatar-uploader"
                action="https://httpbin.org/post"
                :show-file-list="false"
                :on-success="addhandleAvatarSuccess"
                >
                <img v-if="addData.img" :src="addData.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <!-- <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress> -->
              </el-upload>
            </div>
          </div>
          
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button   @click="addVisible = false">取消</el-button>
					<el-button type="primary"  @click="addent">确认</el-button>
				</div>
			</el-dialog>
      <!-- 图片修改 -->
      <el-dialog :visible.sync="managementVisible" width='50%' title="图片修改">
				<div class="edit">
          <div class="box">
            <div class="left">
              <span>连接</span>
            </div>
            <div class="right">
              <el-input
                v-model="editData.url"
                placeholder
                style="width: 200px;"
              ></el-input>
            </div>
          </div>
          <div class="box">
            <div class="left">
              <span>图片</span>
            </div>
            <div class="right">
              <el-upload
                class="avatar-uploader"
                action="https://httpbin.org/post"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="editData.img" :src="editData.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
					
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button   @click="managementVisible = false">取消</el-button>
					<el-button type="primary"  @click="editent">确认</el-button>
				</div>
			</el-dialog>
    </div>
  </div>
</template>

<script>
import { getbannerlist } from '@/api/jifenshangcheng'
import { addbanner } from '@/api/jifenshangcheng'
import { xiubanner } from '@/api/jifenshangcheng'
import { delbanner } from '@/api/jifenshangcheng'
import { paixuBanner } from '@/api/jifenshangcheng'
import axios from "axios";
import Sortable from 'sortablejs'

export default {
  name: "integralbannerDemo",
  data() {
    return {
      //商品管理列表临时数据
      tableData: [
       
      ],
      typeOptions: [
        {
          value: "实体商品",
          label: "实体商品"
        }
      ],
      managementVisible: false, //控制商品管理编辑弹出框显示与隐藏
      addVisible: false, //控制添加弹出框显示与隐藏
      editData: "", //编辑商品数据
      addData: "", //添加商品数据
      imageUrl: "" ,//上传地址
      loading:true,
      videoFlag:false,
    };
  },
  mounted(){
    this.get()
    this.rowDrop()
	},
  methods: {
    get(){
      this.loading = true
      var data = {
        "pageNum": 1,
				"pageSize": 999999,
      }
      getbannerlist(data)
				.then(response => {
					console.log(response.data)
          this.tableData = response.data.rows
          this.loading = false
				})
    },
    add() {
      this.addVisible = true;
      this.addData = {
        img: '', //商品图片
        url: '', //连接
      };
      // this.tableData.push(this.addData);
    },
    addent(){
      
      if (this.addData.img==''||this.addData.img==null) {
        this.$message({
          message: '请先上传图片',
          type: 'warning'
        });
        return
      }  
      var data = this.addData  
      this.addVisible = false     
      addbanner(data)
				.then(response => {
          console.log(response.data)
          this.$message({
						message: '添加成功',
						type: 'success'
					});
					this.get()
				})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    },
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
          // console.log(_this.tableData[newIndex])
          // console.log(_this.tableData[oldIndex])
          var data = {
            "idOne": _this.tableData[newIndex].id,
            "idTwo": _this.tableData[oldIndex].id,
            "idxOne": _this.tableData[newIndex].idx,
            "idxTwo": _this.tableData[oldIndex].idx
          }
          paixuBanner(data)
            .then(response => {
              console.log(response.data)
              _this.get()
            })
        }
      })
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    },
    del(index, row) {
      var data ={
        id:row.id,
      }
      delbanner(data)
				.then(response => {
          console.log(response.data)
          this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.get()
				}) 
    },
    //排序
    shang(index,row){
			var data = {
				"idOne": row.id,
				"idTwo": this.tableData[index-1].id,
				"idxOne": row.idx,
				"idxTwo": this.tableData[index-1].idx
			}
			paixuBanner(data)
				.then(response => {
					console.log(response.data)
					this.get()
				})
		},
		xia(index,row){
			var data = {
				"idOne": row.id,
				"idTwo": this.tableData[index+1].id,
				"idxOne": row.idx,
				"idxTwo": this.tableData[index+1].idx
			}
			console.log(data)
			paixuBanner(data)
				.then(response => {
					console.log(response.data)
					this.get()
				})
		},
    //编辑
    edit(index, row) {
      this.managementVisible = true;
      this.editData = JSON.parse(JSON.stringify(row));
    },
    editent(){
      var data ={
        id:this.editData.id,
        img:this.editData.img,
        url:this.editData.url
      }
      // delete data.modifier;
      // delete data.modifieTime;
      // delete data.createTime;
      console.log(data)
      xiubanner(data)
				.then(response => {
          console.log(response.data)
          this.$message({
						message: '修改成功',
						type: 'success'
					});
          this.get()
          this.managementVisible = false
				})  
    },
    // 自定义表达头+
    renderHeader(h, { column, $index }) {
      var that = this;
      return h("span", [
        h("span", column.label),
        h(
          "el-button",
          {
            style: "margin-left: 5px;",
            on: {
              click: that.add
            }
          },
          ["+"]
        )
      ]);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleAvatarSuccess(res, file) {
      var images="http://shiy.wsuns.com/upload/upload/"
      var tupian=''
      var file = file.raw;
      var formData = new FormData();
      formData.append("imgUpload",file);
      var that = this
      axios
        .post(
          "http://shiy.wsuns.com/upload/jquery/cross/iframeupload",formData
        )
        .then(function(response) {
          tupian=images+response.data.imgPath
          that.editData.img = tupian
        })
        .catch(function(error) {

        })
    },
    addhandleAvatarSuccess(res, file) {
      // console.log(res)
      // console.log(file)
      // this.addData.img = URL.createObjectURL(file.raw);
      var images="http://shiy.wsuns.com/upload/upload/"
      var tupian=''
      var file =  file.raw;
      var formData = new FormData();
      formData.append("imgUpload",file);
      var that = this
      axios
        .post(
          "http://shiy.wsuns.com/upload/jquery/cross/iframeupload",formData
        )
        .then(function(response) {
          tupian=images+response.data.imgPath
          that.addData.img = tupian
        })
        .catch(function(error) {

        })
      
    },
    // uploadVideoProcess(event, file, fileList){
    //   console.log(file)
    //   console.log(event)
    //   console.log(fileList)
    //   this.videoFlag = true;
    //   this.videoUploadPercent = file.percentage.toFixed(0);
    //   console.log(file.percentage)
    // },
    //  handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //   },
    // beforeAvatarUpload(file) {
    //   const isSize = new Promise(function(resolve, reject) {
    //     let width = 78;
    //     let height = 78;
    //     let _URL = window.URL || window.webkitURL;         
    //     let img = new Image();
    //     img.onload = function() {
    //         let valid = img.width <= width && img.height <= height;
    //         valid ? resolve() : reject();
    //     }
    //     img.src = _URL.createObjectURL(file);
    //   }).then(() => {
    //       return file;
    //   }, () => {
    //       this.$message.error('上传的图片必须是等于或小于78*78!');
    //       return Promise.reject();
    //   });
    //   return  isSize;
    // }
  }
};
</script>

<style scoped>
  @import url("./banner.scss");
</style>
<style scoped>
  .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: auto;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>