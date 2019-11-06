<template>
  <div>
    <!-- 入驻信息 -->
    <div class="CheckInformation allWidth">
      <div class="CheckInformation-con">
        <div class="tit">
          <div class="wrap">
            <div class="text">商家入驻</div>
            <div class="ShoppingCart-steps">
              <el-steps
                :active="this.$store.state.OriginalFactoryEntry.active"
                align-center
                finish-status="success"
              >
                <el-step title="基本信息" description></el-step>
                <el-step title="详细信息"></el-step>
                <el-step title="等待审核"></el-step>
                <el-step title="入驻成功"></el-step>
              </el-steps>
            </div>
          </div>
        </div>
        <div v-if="$route.query.residencetype != '3'">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="270px"
            class="demo-ruleForm"
          >
            <h3 class="tit-h3" style="line-height:30px;">
              企业基本信息
              <br />
              <span class="gray" style="font-size:12px;color:#aeaeae">(国内原厂或国外原厂指定国内运营代理商填写)</span>
            </h3>

            <el-form-item label="统一社会信用代码：">
              <div class="recode">
                <el-input
                  v-model="ruleForm.creditcode"
                  type="text"
                  @input="handleInput"
                  maxlength="18"
                  show-word-limit
                  placeholder="请输入18位统一社会信用代码，点击查询可获取企业相关信息"
                ></el-input>
                <el-button v-if="showRequireBtn" @click="getCompanyInfo" type="primary">获取企业信息</el-button>
              </div>
              <p class="small">请严格按照营业执照填写统一社会信用代码</p>
            </el-form-item>

            <el-form-item label="公司注册名称：" prop="companyname">
              <el-input v-model="ruleForm.companyname"></el-input>
              <p class="small">请按照营业执照上登记的完整名称填写</p>
            </el-form-item>
            <!-- <el-form-item label="工商营业执照注册号：" prop="businesslicensenum">
              <el-input v-model="ruleForm.businesslicensenum"></el-input>
            </el-form-item>-->
            <el-form-item label="法定代表人：" prop="legalagent">
              <el-input v-model="ruleForm.legalagent"></el-input>
              <p class="small">确保与营业执照一致</p>
            </el-form-item>
            <el-form-item label="公司成立日期：" prop="establishmenttime">
              <el-date-picker
                v-model="ruleForm.establishmenttime"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="注册资本：" prop="registeredcapital">
              <el-input v-model="ruleForm.registeredcapital"></el-input>
              <p class="small">若注册资本非人民币，请按照当前汇率换算人民币填写</p>
            </el-form-item>
            <el-form-item label="公司注册地址：" prop="companydetailaddress">
              <el-input v-model="ruleForm.companydetailaddress"></el-input>
              <p class="small">填写与营业执照一致的地址</p>
            </el-form-item>
            <el-form-item label="企业网站：" prop="website">
              <el-input v-model="ruleForm.website"></el-input>
            </el-form-item>
            <el-form-item label="经营产品：" prop="product">
              <el-input v-model="ruleForm.product" type="textarea"></el-input>
            </el-form-item>
            <h3 class="tit-h3">企业资质上传</h3>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  企业营业执照
                </h3>
                <p class="small">最新版营业执照,需加盖公司红章</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="有效期：" prop="businesslicensestarttime">
                  <el-date-picker
                    v-model="ruleForm.businesslicensestarttime"
                    type="date"
                    placeholder="开始日期"
                    style="margin-right:10px"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                  <span>至</span>
                  <el-date-picker
                    v-model="ruleForm.businesslicenseendtime"
                    type="date"
                    style="margin-left:10px"
                    placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="营业执照图上传："
                  prop="qualificationmapimg"
                  class="qualificationmapimg qualificationmapimgwrap"
                >
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload1"
                    :on-preview="handlePictureCardPreview"
                    :file-list="qualificationmapList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  请上传平台运营者身份证信息！
                </h3>
              </div>
              <div class="form-item-con">
                <el-form-item label="身份证号：" prop="enterpriseplatformidentity">
                  <el-input
                    v-model="ruleForm.enterpriseplatformidentity"
                    maxlength="18"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="上传身份证正面照片："
                  prop="identityposimg"
                  class="qualificationmapimgwrap"
                >
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload2"
                    :on-preview="handlePictureCardPreview"
                    :file-list="identityposList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(zheng)">
                    <img :src="zheng" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
                <el-form-item
                  label="上传身份证反面照片："
                  prop="identitynegimg"
                  class="qualificationmapimgwrap"
                >
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload3"
                    :on-preview="handlePictureCardPreview"
                    :file-list="identitynegList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>

                  <span class="example-diagram" @click="PrvExampleDiagram(fan)">
                    <img :src="fan" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
                <el-form-item label="上传手持身份证正面照片：" prop="handimage" class="qualificationmapimgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload5"
                    :on-preview="handlePictureCardPreview"
                    :file-list="handimageList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(identityExam)">
                    <img :src="identityExam" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  一般纳税人资格证明
                </h3>
                <p class="small">1.一般纳税人证明</p>
                <p class="small">2.提供近三个月内开票方为公司开具的增值税发票一张</p>
                <p class="small">3.上述条件至少上传一项</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="资质图上传：" prop="taxpayerimg" class="qualificationmapimgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="url"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload4"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemovetaxpayerimg"
                    :file-list="taxpayerimgList"
                    :limit="limitNum"
                  >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(exampleDiagram)">
                    <img :src="exampleDiagram" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>

            <div class="form2-item" v-if="AgentListFlag">
              <h3 class="tit-h3">商标证书或授权资质上传</h3>
              <div class="title-up">
                <h3>
                  <span>*</span>
                  资质类型
                </h3>
                <p class="small">1.品牌商给贵司的授权代理证书、代理协议均可；</p>
                <p class="small">2.品牌商官方网站的截图，请务必将地址栏截图进去；</p>
                <p class="small">3.经营自有品牌请上传国内的商标注册证书；</p>
                <p class="small">以上两项提供任一文件即可！</p>
              </div>
              <div class="form-item-con Agent-con">
                <ul>
                  <li v-for="(item,index) in AgentList" :key="index">
                    <p class="brandName">
                      品牌：
                      <span>{{item.brandName}}</span>
                    </p>
                    <el-form-item label="有效期：" prop="businesslicensestarttime">
                      <el-date-picker
                        v-model="item.qualificationstarttime"
                        type="date"
                        placeholder="开始日期"
                        style="margin-right:100px"
                        value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                      ></el-date-picker>
                      <el-date-picker
                        v-model="item.qualificationendtime"
                        type="date"
                        placeholder="结束日期"
                        value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item
                      label="资质图上传："
                      prop="qualification"
                      class="qualificationmapimgwrap"
                    >
                      <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="url"
                        :auto-upload="true"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :on-success="(res,file,fileList)=>{return successUploadAgency(res,file,fileList,index)}"
                        :on-preview="handlePictureCardPreview"
                        :file-list="item.qualificationimgList"
                        :limit="1"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </el-form>
        </div>
        <div v-if="$route.query.residencetype == '3'">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="270px"
            class="demo-ruleForm"
          >
            <div class="form-item-con">
              <el-form-item label="身份证号：" prop="enterpriseplatformidentity">
                <el-input
                  v-model="ruleForm.enterpriseplatformidentity"
                  maxlength="18"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                label="上传身份证正面照片："
                prop="identityposimg"
                class="qualificationmapimgwrap"
              >
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="url"
                  :auto-upload="true"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :on-success="successUpload2"
                  :on-preview="handlePictureCardPreview"
                  :file-list="identityposList"
                  :limit="1"
                >
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                </el-upload>
                <span class="example-diagram" @click="PrvExampleDiagram(zheng)">
                  <img :src="zheng" alt />
                  <span>示例图</span>
                </span>
              </el-form-item>
              <el-form-item
                label="上传身份证反面照片："
                prop="identitynegimg"
                class="qualificationmapimgwrap"
              >
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="url"
                  :auto-upload="true"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :on-success="successUpload3"
                  :on-preview="handlePictureCardPreview"
                  :file-list="identitynegList"
                  :limit="1"
                >
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                </el-upload>

                <span class="example-diagram" @click="PrvExampleDiagram(fan)">
                  <img :src="fan" alt />
                  <span>示例图</span>
                </span>
              </el-form-item>
              <el-form-item label="上传手持身份证正面照片：" prop="handimage" class="qualificationmapimgwrap">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="url"
                  :auto-upload="true"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :on-success="successUpload5"
                  :on-preview="handlePictureCardPreview"
                  :file-list="handimageList"
                  :limit="1"
                >
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                </el-upload>

                <span class="example-diagram" @click="PrvExampleDiagram(identityExam)">
                  <img :src="identityExam" alt />
                  <span>示例图</span>
                </span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div style="text-align:center;">
          <el-checkbox v-model="hasReading">我已阅读并接受</el-checkbox>《
          <a @click="showXieyi=true">{{title}}供应商申请入驻协议</a>》
        </div>
        <span class="dialog-footer">
          <span class="sure bgColor" @click="submitForm('ruleForm')">
            <img src="@/assets/image/OriginalFactoryEntry/u44984.png" alt />
            确认提交
          </span>
          <span @click="back" class="back sure">
            <img src="@/assets/image/OriginalFactoryEntry/u197292.png" alt />
            返回上一步
          </span>
        </span>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <el-dialog :visible.sync="showXieyi" width="800px">
        <div class="xieyi">
          <h3>水木晶城供应商申请入驻协议</h3>
           <div class="content"> <p class="desc">欢迎来到水木晶城ICmap！</p>
          <p>感谢您对水木晶城的信任和支持。为了更好的为您提供服务和明确您在水木晶城的权利和义务，请您在注册前仔细阅读本协议。</p>
          <p>以下详述水木晶城（亦称本商城）向您提供使用服务的权利条款。</p>
          <p>此协议是您与北京晶圆电子有限公司（www.icmap.cn）共同签订，自您阅读并同意本协议之时即刻生效，本协议具有合同效力，协议双方等同于合同双方。</p>
        
            <h5>1.1、用户协议内容阅读及同意条例</h5>
            <p>
              <br />1.1) 水木晶城中的各项电子服务的所有权和运作权归水木晶城所有，所提供的服务将完全按照其发布的服务条款和操作规则执行。同时请注意，本协议内容包括协议正文及水木晶城所有已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除非特别声明，与本商城及其相关联公司、新增加的服务和功能同样适用此协议。
              <br />2.2) 水木晶城提供包括产品供应信息发布，商品价格以及产品订单等服务（以下称“服务”）。使用本商城的服务前，您理解水木晶城提供的所有服务信息，本商城只对官方发布的信息负责。由用户自己产生的信息，其中包含的文字，图片，链接等，均由上传该内容的用户承担全部责任，您必须自己评估和承担您使用用户自己生成的内容时产生的一切风险及损失。
              <br />3.3) 您以任何方式使用本商城提供的服务均被视为您已经阅读和接受本协议，同时水木晶城有权根据需要不定时地对本协议及/或各类规则进行制订、修改，新的条款会在商城进行公告，不再对您进行单独通知。变更后的协议和规则一经公布后立即自动生效，如果您不愿意接受新的协议，您必须放弃使用水木晶城提供的服务；届时如产生纠纷，您不能以不知道或不同意修改协议为由逃避责任。
              <br />4.4) 此协议只有本商城出面授权的人员才可以修改。水木晶城有权利通过包括但不限于删除信息，终止账户，屏蔽联系方式，禁止此用户再次注册或法律诉讼等方式执行本用户协议，如您对协议中的内容有疑问，请联系我们。
            </p>
            <h5>2.2、注册条例</h5>
            <p>
              <br />1.2-1用户资质：
              <span>
                <br />水木晶城的用户是能够承担相应法律责任的公司、法人或者公司指定的个人。若您不具备上述主体资格，您及您的监护人应承担相应后果，同时水木晶城保留对您及您监护人的索赔权，并有权永久注销掉您的账号。若想在本商城进行交易，用户必须先注册本商城账户，并通过本商城资质审核。
              </span>
              <br />
              <br />2.2-2用户注册：
              <span>
                <br />如您同意本协议，继续完成注册程序，水木晶城会向您提供与您的手机号对应的唯一水木晶城用户账户（亦简称为账户）。在此之前，您必须同意：
                <br />1) 申请账户时，您应当按照法律法规要求提供真实、准确、即时、完整的注册信息；维护并及时更新注册信息以保持其真实、准确、即时、完整。如本商城发现或持有合理理由认定您提供的注册资料错误、不实、过时或不完整，本商城有权要求您限期更正并有权直接删除相应资料，直至中止、终止对您提供部分或全部服务；在实际交易过程中，您也同时承认了您拥有购买水木晶城产品的权利能力和行为能力，并且您将对您在订单中提供的所有信息的真实性负责。对于因为您没有做到上述要求而产生的任何直接或间接损失，水木晶城保留追诉权利。
                <br />2) 严禁用户依凭一份企业材料（包括但不限于营业执照、税务登记证、以及公司地址和银行账户信息等材料）注册两个或两个以上的账户，一经发现并证实您在不能提供水木晶城认定为有效的理由却持有两个或两个以上的账户，本商城有权行使封号、清退账户的权利，对由此操作给用户带来的一切损失不承担负责。
                <br />
                <strong>3) 您在使用水木晶城的服务过程中涉及的应缴纳税务款，应报批的手续及相关的硬件、软件等等各种耗费，均由您独自承担。</strong>
              </span>
            </p>
            <h5>3.3、用户账号和密码安全</h5>
            <p>
              <br />注册成功后，您要对使用您所持有的用户名和用户密码代表的用户账号所进行的一切活动负责。您须同意:
              <br />1.1) 商城通过用户名和用户密码对应的用户账号确认用户的操作，您对由您持有账户在本商城进行的一切活动负责。您有责任采取必要措施保护自己所持有的用户注册名、密码的安全，并独立承担由于人为过失原因导致密码泄露后产生的一切损失。
              <br />2.2) 除非有法律规定或司法裁定，且征得水木晶城的同意。否则，账户和密码不得以任何方式转让、赠与或继承。对用户操作不当泄露账号密码给第三方造成的损失，您可以向侵权方追讨赔偿，水木晶城不承担责任。
              <br />3.3) 如果用户发现所持有账户出现交易异常或账户安全受到威胁的情况，您应当立即通过有效方式通知本商城暂停该账号的使用权限并采取认为有必要的安全保护措施。因用户通知本商城不及时导致本商城封号迟缓给用户带来的一切损失，本商城不承担责任。除非用户有确凿证据表明是由于本商城的操作不当给用户造成了损失，本商城会承担相应责任。
              <br />4.4) 为方便您使用水木晶城提供的服务及关联网站或其他组织的服务（以下称其他服务），您同意并授权水木晶城将您在注册、使用水木晶城提供的服务过程中提供、形成的信息传递给向您提供其他服务的关联公司或其他组织，或从提供其他服务的关联公司或其他组织获取您在注册、使用其他服务期间提供、形成的信息。
              <br />5.5) 您应确保您的每次登录和离开本商城都按照正常操作进行。因为您本人没有按照正常流程操作而造成的各种损失，水木晶城不承担任何责任。
            </p>
            <h5>4.4、账户信息管理</h5>
            <p>
              <br />本商城承诺尊重用户隐私，保护用户非公开信息的安全。所以，本商城一定不会在未经合法用户授权时公开、编辑或透露其注册资料及其保存在本商城中的非公开内容。除以下情况会对用户账号和信息做出适当处理：
              <br />1.1) 用户授权本商城透露这些信息。
              <br />2.2) 相应的法律及程序要求本商城提供用户的资料。
              <br />3.3) 保护水木晶城其他用户和公众的权益或个人安全。
              <br />4.4) 本商城有合理的理由认为特定用户或某些具体交易事项可能存在重大违法或违约情形。
            </p>
            <h5>5.5、水木晶城网站服务使用规范：</h5>
            <p>
              <br />用户同意严格遵守以下条款：
              <br />1.1) 本协议条款是处理双方权利义务的约定，除非违反国家强制性法律，否则始终有效。
              <br />2.2) 依据国家相关法律法规规章制定，用户不得利用本商城从事非法活动；不能干扰或混乱网络服务；遵守所有使用网络服务的网络协议、规定、程序和惯例；
              <br />3.3) 只有水木晶城的注册用户才可以在水木晶城上进行交易活动。水木晶城有权审核用户发布或删除用户提交的信息。所有的用户对其发布信息的准确性、完整性、即时性、合法性都独立承担所有责任，水木晶城尽可能检查用户提交的信息，但不能完全保证所有信息的准确性和合法性，同时也不承担由此引至的任何法律责任。
              <br />4.4) 用户不得利用本商城及关联的一切渠道从事非法交易行为；不得利用本商城及关联的一切信息渠道制造、滥发、传播包括但不限于谣言、重复信息、诋毁行业或他人的信息或是损害公众利益、违反相关法律以及威胁国家安全的信息。
              <br />5.5) 用户不得利用本商城及相关联的信息平台攻击、盗取他人密码账号，侵犯第三方权利。
              <br />6.6) 如果您在本商城上的行为构成犯罪或侵犯了第三方的权利，使本商城蒙受索赔、处罚、诉讼等损失，您需就您的违规行为给本商城带来的一切直接和间接损失进行赔偿。
              <br />7.7) 水木晶城保留因您违反上述条例而给水木晶城造成损失的追诉权利。
              <br />8.8) 对于您提供的资料及数据信息，您授予水木晶城及其关联公司独家的、全球通用的、永久的、免费的许可使用权利 (并有权在多个层面对该权利进行再授权)。此外，水木晶城及其关联公司有权(全部或部份地) 使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据（包括但不限于注册资料、交易行为数据及全部展示于水木晶城的各类信息）或制作其派生作品，并以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。
            </p>
            <h5>6.6、终止协议或限制访问</h5>
            <p>
              <br />1.1) 您同意，水木晶城有权对您是否违反上述承诺做出单方认定，并根据单方认定结果适用规则予以处理或终止向您提供服务，且无须提前通知或征得您以及其他任何第三方的同意。
              <br />2.2) 经国家行政或司法机关的生效法律文书确认您存在违法或侵权行为，或者水木晶城根据自身的判断，认为您的行为涉嫌违反本协议和/或规则的条款或涉嫌违反法律法规的规定的，则水木晶城有权公示您的该等涉嫌违法或违约行为及水木晶城对您采取的措施。
              <br />3.3) 终止您的账户服务的同时您将不能继续在水木晶城以及相关公司内使用任何服务；同时您的注册资料及所有相关信息均会被删除或丢弃。
              <br />4.4) 您有权向水木晶城要求注销您的账户，经水木晶城审核同意后，会注销您的账户。终止您的服务后，水木晶城有权保留您在商城活动时的交易记录， 水木晶城没有义务为您保留或披露您当初在本商城的任何信息或者将您未曾阅读或发送过的信息转发给您或第三方。
            </p>
            <h5>7.7、责任限制</h5>
            <p>
              <br />本商城不承担因超出本商城合理控制之外的原因而造成本商城延迟或未能履约出现的损失，包括但不限于一切不可抗力，如自然灾害，罢工或骚乱，政府行为，战争，系统崩溃或其他严重故障等情况。本商城会尽可能的处理善后事宜，尽最大努力挽回客户损失。
            </p>
            <h5>8.8、管辖法律和适用</h5>
            <p>
              <br />本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决。协商不成时，任何一方均可向人民法院提起诉讼，并由本公司所在地的中华人民共和国法院管辖。
              版权声明 水木晶城内的所有内容版权属北京晶圆电子有限公司所有，严禁未经水木晶城书面许可的任何形式的部分或全部拷贝。
            </p>
            <div style="text-align:center;">
              <br />
              <el-checkbox v-model="hasReading">
                我已阅读并接受《
                {{title}}供应商申请入驻协议》
              </el-checkbox>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less">
.recode {
  .el-input__suffix {
    .el-input__count-inner {
      background: none;
    }
  }
}
</style>
<style lang="less" scoped>
@import "./CheckInformation.less";
</style>

<script>
// import "@/assets/css/ele-form.less";
// import "@/assets/css/label-checkbox.less";
import { baseURL, baseURL4 } from "@/config";
import { mapState, mapActions, mapMutations } from "vuex";
import { formatDateTime } from "@/lib/utils";
import VDistpicker from "v-distpicker";
import { axios, FactoryEntry } from "../../../api/apiObj";
export default {
  name: "UpgradeLevel",
  data() {
    return {
      hasReading: false,
      showXieyi: false,
      count: 0,
      showRequireBtn: false,
      AgentListFlag: false,
      // 资质图的数量
      limitNum: 1,
      checkboxChangeValue: false,
      checkboxChangeValue2: false,
      dialogImageUrl: "",
      // 示例图
      exampleDiagram: require("@/assets/image/OriginalFactoryEntry/u85165.jpg"),
      identityExam: require("@/assets/image/OriginalFactoryEntry/timg.jpg"),
      zheng: require("@/assets/image/OriginalFactoryEntry/zheng.jpg"),
      fan: require("@/assets/image/OriginalFactoryEntry/fan.jpg"),
      // 预览图片
      dialogVisible: false,
      // 代理商的上传图片
      AgentList: [],
      //营业执照图片回显
      qualificationmapList: [],
      identityposList: [],
      identitynegList: [],
      taxpayerList: [],
      handimageList: [],
      taxpayerimgList: [],
      // 基本信息
      ruleForm: {
        // 信用代码
        creditcode: "",
        // 公司注册名称
        companyname: "",
        // 工商营业执照注册号
        // businesslicensenum: "",
        // 法定代表人
        legalagent: "",
        // 公司成立时间
        establishmenttime: "",
        // 注册资本
        registeredcapital: "",
        // 公司所在地
        companyaddress: "",
        // 公司详细地址
        companydetailaddress: "",
        // 营业执照有效期开始时间
        businesslicensestarttime: "",
        //  企业营业执照结束时间
        businesslicenseendtime: "",
        // 营业执照是否长期
        businesshours: "",
        // 营业执照上传
        qualificationmapimg: "",
        // 身份证
        enterpriseplatformidentity: "",
        // 身份证正面
        identityposimg: "",
        // 身份证反面
        identitynegimg: "",
        // 一般纳税人资格上传
        taxpayerimg: "",
        // 代理资质图的数组
        qualification: [],
        // 代理资质时间
        qualificationtime: []
      },

      // 基本信息验证
      rules: {
        companyname: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          {
            min: 3,
            message: "公司名称名称最小为3个字符",
            trigger: "blur"
          }
        ],
        businesslicensenum: [
          { required: true, message: "请输入营业注册号", trigger: "blur" },
          { min: 5, message: "营业注册号最小为5个字符", trigger: "blur" }
        ],
        legalagent: [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        establishmenttime: [
          {
            type: "string",
            required: true,
            message: "请选择成立日期",
            trigger: "change"
          }
        ],
        registeredcapital: [
          { required: true, message: "请输入注册资本", trigger: "blur" },
          { min: 1, message: "注册资本最小为1个字符", trigger: "blur" }
        ],
        companydetailaddress: [
          { required: true, message: "请选择公司注册地址", trigger: "blur" }
        ],
        businesslicenseaddr: [
          { required: true, message: "请输入营业照所在地", trigger: "blur" },
          { min: 2, message: "营业照所在地最小为2个字符", trigger: "blur" }
        ],
        businesscope: [
          { required: true, message: "请输入营业范围", trigger: "blur" },
          { min: 2, message: "营业范围最小为2个字符", trigger: "blur" }
        ],
        companyaddress: [
          { required: true, message: "请输入公司所在地", trigger: "blur" },
          { min: 2, message: "公司所在地最小为2个字符", trigger: "blur" }
        ],
        companydetailaddress: [
          { required: true, message: "请输入公司详细地址", trigger: "blur" },
          { min: 2, message: "公司详细地址最小为2个字符", trigger: "blur" }
        ],
        businesslicensestarttime: [
          {
            required: true,
            message: "请输入有效期开始时间",
            trigger: "blur"
          }
        ],
        businesslicenseendtime: [
          {
            required: true,
            message: "请输入有效期结束时间",
            trigger: "blur"
          }
        ],
        qualificationmapimg: [
          {
            required: true,
            message: "请上传营业执照",
            trigger: "blur"
          }
        ],
        enterpriseplatformidentity: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          }
        ],
        identityposimg: [
          {
            required: true,
            message: "请上传手持身份证正面",
            trigger: "blur"
          }
        ],
        identitynegimg: [
          {
            required: true,
            message: "请上传手持身份证反面",
            trigger: "blur"
          }
        ],
        taxpayerimg: [
          {
            required: true,
            message: "请上传一般纳税人资格图",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: { VDistpicker },
  computed: {
    ...mapState({
      title: state => state.title
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    url() {
      return (
        baseURL +
        `api-b/vipApply/uploadPicture?access_token=${this.access_token}&fileSource=QINIUYUN&type=5&id=1`
      );
    },
    ...mapState("OriginalFactoryEntry", ["joinForm", "applyDetailEdit"])
  },
  created() {
    if (!this.joinForm.residencetype) {
      this.$router.push({ path: "/OriginalFactoryEntry" });
    }
  },
  mounted() {
    if (this.joinForm.residencetype == 3 || this.joinForm.residencetype == 18) {
      this.AgentListFlag = false;
    } else {
      this.AgentListFlag = true;
    }
    if (this.joinForm.id) {
      this.qualificationmapList.push({
        url: baseURL4 + this.joinForm.qualificationmapimg
      });
      this.identityposList.push({
        url: baseURL4 + this.joinForm.identityposimg
      });
      this.identitynegList.push({
        url: baseURL4 + this.joinForm.identitynegimg
      });
      this.handimageList.push({ url: baseURL4 + this.joinForm.handimage });
      if (this.joinForm.taxpayerimg) {
        let arr = this.joinForm.taxpayerimg.split("@");
        this.taxpayerimgList = arr.map(item => {
          return { url: baseURL4 + item };
        });
      }
      // if(this.joinForm.brandIds){
      //   let brandTime=this.joinForm.qualificationtime.split("@")
      //   this.joinForm.brandName.forEach((item, index) => {
      //     let obj = {}
      //     if(this.joinForm. brand){
      //       obj={
      //         brandName: item,
      //         brand:this.joinForm.brandIds.split("@")[index],
      //         qualificationendtime: brandTime[index].split("-")[1],
      //         qualificationstarttime: brandTime[index].split("-")[0],
      //         qualificationimgList:[{url:baseURL4+this.joinForm.qualification.split('@')[index]}],
      //         imageUrl:this.joinForm.qualification.split("@")[index]
      //       };
      //     }else{
      //       obj = {
      //       brandName: item,
      //       brand:this.joinForm.brandIds.split("@")[index],
      //     };
      //     }
      //     this.AgentList.push(obj);
      //   });
      // }
    }

    this.ruleForm = { ...this.ruleForm, ...this.joinForm };
    this.AgentList = this.ruleForm.EndselectBrandList.map(item => {
      if (item.brandTime) {
        return {
          brandName: item.brand,
          brand: item.id,
          qualificationendtime: item.brandTime.split("-")[1],
          qualificationstarttime: item.brandTime.split("-")[0],
          qualificationimgList: [{ url: baseURL4 + item.brandImg }],
          imageUrl: item.brandImg
        };
      } else {
        return {
          brandName: item.brand,
          brand: item.id
        };
      }
    });
    this.limitNum = this.ruleForm.brandName.length;

    //过滤掉新增的品牌
    // var index = this.AgentList.findIndex(
    //   item => item.brand === this.$route.query.newBrand
    // );
    // var index0 = this.AgentList.findIndex(
    //   item => item.brand === this.$route.query.newBrand
    // );
    // var newArr = [];
    // this.AgentList.forEach((item, index) => {
    //   if (index0 == index) {
    //     //过滤掉新增的品牌的id
    //     var oldbrand = this.joinForm.brand.split("@");
    //     oldbrand.splice(index, 1);
    //     this.joinForm.brand = oldbrand.join("@");
    //   } else {
    //     newArr.push(item);
    //   }
    // });
    // this.AgentList = newArr;
    // this.AgentList.map(item => {
    //   item["brandmapList"] = [];
    // });
    // this.ruleForm.brandName = this.AgentList.map(item => item.brand);
  },
  methods: {
    ...mapActions("OriginalFactoryEntry", ["GetInsertBrandReview"]),
    ...mapMutations("OriginalFactoryEntry", ["setJoinForm"]),
    handleInput() {
      let obj = this.ruleForm.creditcode;
      obj = obj.replace(/[\W]/g, "").toUpperCase();
      this.$set(this.ruleForm, "creditcode", obj);
      if (obj.length >= 18) {
        if (this.count < 1) {
          this.showRequireBtn = true;
        } else {
          this.showSetForm = true;
        }
      }
    },
    getCompanyInfo() {
      let creditcode = this.ruleForm.creditcode;
      axios
        .request({
          ...FactoryEntry.queryCompnayInfo,
          params: {
            creditNo: this.ruleForm.creditcode
          }
        })
        .then(res => {
          if (res.data) {
            this.ruleForm.creditcode = creditcode;
            this.ruleForm.companyname = res.data.companyName;
            this.ruleForm.businesslicensenum = res.data.no;
            this.ruleForm.legalagent = res.data.operName;
            this.ruleForm.establishmenttime = res.data.startDate;
            this.ruleForm.registeredcapital = res.data.registCapi;
            this.ruleForm.companydetailaddress = res.data.address;
            this.ruleForm.businesslicensestarttime = res.data.tremsStart;
            this.ruleForm.businesslicenseendtime = res.data.termsEnd;
          }
          this.count++;
          this.showRequireBtn = false;
        });
    },
    // 平台入驻的确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.access_token = this.access_token;
          this.ruleForm.isbusinesslicenseend = this.checkboxChangeValue;
          this.ruleForm.businesshours = this.checkboxChangeValue2;
          this.ruleForm.review = "0";
          //品牌的处理
          if (this.AgentList && this.AgentList.length) {
            let brand = {};
            this.AgentList.forEach((item, index) => {
              if (index == 0) {
                brand.qualification = item.imageUrl;
                brand.brand = item.brand;
                brand.qualificationtime =
                  item.qualificationstarttime + "-" + item.qualificationendtime;
              } else if (index > 0) {
                brand.qualification = brand.qualification + "@" + item.imageUrl;
                brand.brand = brand.brand + "@" + item.brand;
                brand.qualificationtime =
                  brand.qualificationtime +
                  "@" +
                  item.qualificationstarttime +
                  "-" +
                  item.qualificationendtime;
              }
            });
            this.ruleForm = { ...this.ruleForm, ...brand };
          }

          // 对上传多张图片的处理
          // let ret = this.ruleForm.qualificationmapimg instanceof Array;
          // if (ret) {
          //   this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.join(
          //     "@"
          //   );
          // }
          // let ret2 = this.ruleForm.taxpayerimg instanceof Array;
          // if (ret2) {
          //   this.ruleForm.taxpayerimg = this.ruleForm.taxpayerimg.join("@");
          // }

          // let ret3 = this.ruleForm.qualification instanceof Array;
          // if (ret3) {
          //   this.ruleForm.qualification = this.ruleForm.qualification.join("@");
          // }
          // let brandImageUrlList=this.AgentList.map(item=>{
          //   return item.imageUrl
          // })
          // if(brandImageUrlList.length>0){
          //   this.ruleForm.qualification = brandImageUrlList.join("@");
          // }
          // let ret4 = this.ruleForm.qualificationtime instanceof Array;
          // if (ret4) {
          //   this.ruleForm.qualificationtime = this.ruleForm.qualificationtime.join(
          //     "@"
          //   );
          // }
          // if (this.applyDetailEdit.id) {
          //   this.ruleForm["id"] = this.applyDetailEdit.id;
          // }

          if (!this.AgentListFlag && this.ruleForm.residencetype == 3) {
            delete this.ruleForm.brand;
          }
          if (
            this.ruleForm.residencetype == 3 ||
            this.ruleForm.residencetype == 18
          ) {
            delete this.ruleForm.qualificationtime;
            delete this.ruleForm.qualification;
          }
          delete this.ruleForm.brandIds;
          delete this.ruleForm.brandName;
          delete this.ruleForm.EndselectBrandList;
          delete this.ruleForm.businesslicensenum;
          if (!this.hasReading) {
            this.$message({
              message: "请先阅读并接受水木晶城供应商申请入驻协议",
              type: "warning"
            });
            this.showXieyi = true;
            return;
          }
          this.GetInsertBrandReview(this.ruleForm)
            .then(res => {
              this.setJoinForm({});
              localStorage.removeItem("joinForm");
              this.$router.push({
                path: "/OriginalFactoryEntry/WaitingAudit"
              });
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          this.$message.error("请完善信息!");
          return false;
        }
      });
    },

    // 上传之前图片的大小
    beforeAvatarUpload(file) {
      // const isLt2M = file.size / 1024 / 1024 < 1;
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 1MB!");
      // }
      // return isLt2M;
    },
    // 资质上传图
    successUpload1(response, file, fileList) {
      // let ret = this.ruleForm.qualificationmapimg instanceof Array;
      // if (ret) {
      //   this.ruleForm.qualificationmapimg.push(response.data);
      // } else {
      //   this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.split(
      //     "@"
      //   );
      //   this.ruleForm.qualificationmapimg.push(response.data);
      // }
      this.ruleForm.qualificationmapimg = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    onChangeAgency(res) {
      console.log(res);
    },
    changeFile(r, e, s) {
      console.log(r, e, s);
    },
    // 代理商资质图上传成功
    successUploadAgency(response, file, fileList, index) {
 
      this.AgentList[index].imageUrl = response.data;
      // let ret = this.ruleForm.qualification instanceof Array;
      // if (ret) {
      //   this.ruleForm.qualification.push(response.data);
      // } else {
      //   this.ruleForm.qualification = this.ruleForm.qualification.split("@");
      //   this.ruleForm.qualification.push(response.data);
      // }
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 身份证正面
    successUpload2(response) {
      this.ruleForm.identityposimg = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 身份证反面
    successUpload3(response) {
      this.ruleForm.identitynegimg = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    successUpload5(response) {
      this.ruleForm.handimage = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    handleRemovetaxpayerimg(file, fileList) {
      let arr = this.ruleForm.taxpayerimg.split("@");
      arr.splice(arr.findIndex(item => baseURL4 + item == file.url), 1);
      this.ruleForm.taxpayerimg = arr.join("@");
    },
    // 纳税资格人上传
    successUpload4(response, file, fileList) {
      if (this.ruleForm.taxpayerimg) {
        this.ruleForm.taxpayerimg =
          this.ruleForm.taxpayerimg + "@" + response.data;
      } else {
        this.ruleForm.taxpayerimg = response.data;
      }
      // let ret = this.ruleForm.taxpayerimg instanceof Array;
      // if (ret) {
      //   this.ruleForm.taxpayerimg.push(response.data);
      // } else {
      //   this.ruleForm.taxpayerimg = this.ruleForm.taxpayerimg.split("@");
      //   this.ruleForm.taxpayerimg.push(response.data);
      // }
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    distpicker(x) {
      console.log("x:", x);
      this.ruleForm.companyaddress = `${x.province.value}/${x.city.value}/${x.area.value}`;
    },
    back() {
      this.$router.go(-1);
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 展开示例图图片
    PrvExampleDiagram(x) {
      this.dialogImageUrl = x;
      this.dialogVisible = true;
    }
  }
};
</script>

