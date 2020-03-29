<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item>买家中心</el-breadcrumb-item>-->
      <el-breadcrumb-item>申请月结</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 入驻信息 -->
    <div class="CheckInformation">
      <div class="CheckInformation-con">
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="270px"
            class="demo-ruleForm"
          >
          <div style="display:flex;">
             <div style="width:150px;">申&nbsp;请&nbsp;条&nbsp;件：</div>
            <div style="line-height:1.7;font-size:14px;">
              <p>1､工商注册超过1年以上的企业客户，暂时不支持个人客户；</p>
              <p>2､企业客户必须是终端用户，代工厂、设计公司等；代理、贸易和分销企业暂时不支持；</p>
              <p>3､申请的企业必须具有一般纳税人资格；</p>
            </div>
            
          </div>
            <h3 class="tit-h3">企业基本信息</h3>
            <el-form-item label="统一社会信用代码：">
              <div class="recode">
                <el-input
                  v-model="ruleForm.creditCode"
                  type="text"
                  @input="handleInput"
                  maxlength="18"
                  show-word-limit
                ></el-input>
                <el-button v-if="showRequireBtn" @click="getCompanyInfo" type="primary">获取企业信息</el-button>
              </div>
              <p class="small">请严格按照营业执照填写统一社会信用代码</p>
            </el-form-item>

            <el-form-item label="公司注册名称：" prop="companyname">
              <el-input v-model="ruleForm.companyName"></el-input>
              <p class="small">请按照营业执照上登记的完整名称填写</p>
            </el-form-item>
            <el-form-item label="工商注册号：" prop="no">
              <el-input v-model="ruleForm.no"></el-input>
              <p class="small">确保与营业执照一致</p>
            </el-form-item>
            <el-form-item label="法定代表人：" prop="operName">
              <el-input v-model="ruleForm.operName"></el-input>
              <p class="small">确保与营业执照一致</p>
            </el-form-item>
            <el-form-item label="公司成立日期：" prop="startDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model="ruleForm.startDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="注册资本：" prop="registCapi">
              <el-input v-model="ruleForm.registCapi"></el-input>
              <p class="small">若注册资本非人民币，请按照当前汇率换算人民币填写</p>
            </el-form-item>
            <el-form-item label="营业期限：" prop="termsEnd">
              <el-date-picker
                v-model="ruleForm.tremsStart"
                type="date"
                placeholder="营业开始日期"
                style="margin-right:100px"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              ></el-date-picker>
              <el-date-picker
                v-model="ruleForm.termsEnd"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="date"
                placeholder="营业结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="公司注册地址：" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
              <p class="small">填写与营业执照一致的地址</p>
            </el-form-item>
            <el-form-item label="联系人：" prop="conName">
              <el-input v-model="ruleForm.conName"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号：" prop="telephone">
              <el-input v-model="ruleForm.telephone"   maxlength="11"
                  show-word-limit></el-input>
            </el-form-item>
            <h3 class="tit-h3">企业资质上传（所有资质需要加盖红章）</h3>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  企业营业执照
                </h3>
                <p class="small">最新版营业执照，需加盖公司红章</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="营业执照上传：" prop="url" class="imgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload1"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove1"
                    :file-list="businessList"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，文件大小限制为2MB以内，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(zhizhao)">
                    <img :src="zhizhao" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
            <div class="form2-item">
              <div class="title-up">
                <h3>
                  <span>*</span>
                  企平台负责人身份证正反面
                </h3>
                <p class="small">需加盖公司红章</p>
              </div>
              <div class="form-item-con">
                <el-form-item label="身份证：" prop="peopleId">
                  <el-input
                    v-model="ruleForm.peopleId"
                    @input="handleInputNum"
                    maxlength="18"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item label="上传正面照片：" prop="idUrlA" class="imgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload2"
                    :on-preview="handlePictureCardPreview"
                    :file-list="idUrlAList"
                    :limit="1"
                    :on-remove="handleRemove2"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(zheng)">
                    <img :src="zheng" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
                <el-form-item label="上传反面照片：" prop="idUrlB" class="imgwrap">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload3"
                    :on-preview="handlePictureCardPreview"
                    :file-list="idUrlBList"
                    :limit="1"
                    :on-remove="handleRemove3"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>

                  <span class="example-diagram" @click="PrvExampleDiagram(fan)">
                    <img :src="fan" alt />
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
                <p class="small">1.一般纳税人证明（需加盖公司红章）</p>
                <p class="small">2.提供近三个月内开票方为公司开具的增值税发票一张</p>
                <p class="small">3.上述条件至少上传一项</p>
              </div>
              <div class="form-item-con imgwrap">
                <el-form-item label="资质图上传：" prop="taxUrl">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="requestUrl"
                    :auto-upload="true"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpload4"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove4"
                    :file-list="taxUrlList"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >图片尺寸请确保800px*800px以上，支持png、jpg、gif格式</div>
                  </el-upload>
                  <span class="example-diagram" @click="PrvExampleDiagram(zhizhao)">
                    <img :src="zhizhao" alt />
                    <span>示例图</span>
                  </span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div style="text-align:center;">
              <br />
              <el-checkbox v-model="hasReading">
                我已阅读并接受《
                <strong class="blu" @click="showXieyi=true">{{title}}月结白条申请协议</strong>》
              </el-checkbox>
            </div>
        <span class="dialog-footer">
          <span class="sure bgColor" @click="submitForm('ruleForm')">
            <img src="@/assets/image/OriginalFactoryEntry/u44984.png" alt />
            提交资料
          </span>
        </span>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <el-dialog 
      :visible.sync="showXieyi" 
      width="800px"
      title="月结白条申请协议"
      :center="true"
      >
        <div class="xieyi">
          <!-- <h3>月结白条申请协议</h3> -->
            <div class="content">
              月结白条申请协议内容
              <!--<p class="desc">欢迎来到大麦晶城ICmap！</p>
          <p>感谢您对大麦晶城的信任和支持。为了更好的为您提供服务和明确您在大麦晶城的权利和义务，请您在注册前仔细阅读本协议。</p>
          <p>以下详述大麦晶城（亦称本商城）向您提供使用服务的权利条款。</p>
          <p>此协议是您与北京晶圆电子有限公司（www.icmap.cn）共同签订，自您阅读并同意本协议之时即刻生效，本协议具有合同效力，协议双方等同于合同双方。</p>
        
            <h5>1.1、用户协议内容阅读及同意条例</h5>
            <p>
              <br />1.1) 大麦晶城中的各项电子服务的所有权和运作权归大麦晶城所有，所提供的服务将完全按照其发布的服务条款和操作规则执行。同时请注意，本协议内容包括协议正文及大麦晶城所有已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除非特别声明，与本商城及其相关联公司、新增加的服务和功能同样适用此协议。
              <br />2.2) 大麦晶城提供包括产品供应信息发布，商品价格以及产品订单等服务（以下称“服务”）。使用本商城的服务前，您理解大麦晶城提供的所有服务信息，本商城只对官方发布的信息负责。由用户自己产生的信息，其中包含的文字，图片，链接等，均由上传该内容的用户承担全部责任，您必须自己评估和承担您使用用户自己生成的内容时产生的一切风险及损失。
              <br />3.3) 您以任何方式使用本商城提供的服务均被视为您已经阅读和接受本协议，同时大麦晶城有权根据需要不定时地对本协议及/或各类规则进行制订、修改，新的条款会在商城进行公告，不再对您进行单独通知。变更后的协议和规则一经公布后立即自动生效，如果您不愿意接受新的协议，您必须放弃使用大麦晶城提供的服务；届时如产生纠纷，您不能以不知道或不同意修改协议为由逃避责任。
              <br />4.4) 此协议只有本商城出面授权的人员才可以修改。大麦晶城有权利通过包括但不限于删除信息，终止账户，屏蔽联系方式，禁止此用户再次注册或法律诉讼等方式执行本用户协议，如您对协议中的内容有疑问，请联系我们。
            </p>
            <h5>2.2、注册条例</h5>
            <p>
              <br />1.2-1用户资质：
              <span>
                <br />大麦晶城的用户是能够承担相应法律责任的公司、法人或者公司指定的个人。若您不具备上述主体资格，您及您的监护人应承担相应后果，同时大麦晶城保留对您及您监护人的索赔权，并有权永久注销掉您的账号。若想在本商城进行交易，用户必须先注册本商城账户，并通过本商城资质审核。
              </span>
              <br />
              <br />2.2-2用户注册：
              <span>
                <br />如您同意本协议，继续完成注册程序，大麦晶城会向您提供与您的手机号对应的唯一大麦晶城用户账户（亦简称为账户）。在此之前，您必须同意：
                <br />1) 申请账户时，您应当按照法律法规要求提供真实、准确、即时、完整的注册信息；维护并及时更新注册信息以保持其真实、准确、即时、完整。如本商城发现或持有合理理由认定您提供的注册资料错误、不实、过时或不完整，本商城有权要求您限期更正并有权直接删除相应资料，直至中止、终止对您提供部分或全部服务；在实际交易过程中，您也同时承认了您拥有购买大麦晶城产品的权利能力和行为能力，并且您将对您在订单中提供的所有信息的真实性负责。对于因为您没有做到上述要求而产生的任何直接或间接损失，大麦晶城保留追诉权利。
                <br />2) 严禁用户依凭一份企业材料（包括但不限于营业执照、税务登记证、以及公司地址和银行账户信息等材料）注册两个或两个以上的账户，一经发现并证实您在不能提供大麦晶城认定为有效的理由却持有两个或两个以上的账户，本商城有权行使封号、清退账户的权利，对由此操作给用户带来的一切损失不承担负责。
                <br />
                <strong>3) 您在使用大麦晶城的服务过程中涉及的应缴纳税务款，应报批的手续及相关的硬件、软件等等各种耗费，均由您独自承担。</strong>
              </span>
            </p>
            <h5>3.3、用户账号和密码安全</h5>
            <p>
              <br />注册成功后，您要对使用您所持有的用户名和用户密码代表的用户账号所进行的一切活动负责。您须同意:
              <br />1.1) 商城通过用户名和用户密码对应的用户账号确认用户的操作，您对由您持有账户在本商城进行的一切活动负责。您有责任采取必要措施保护自己所持有的用户注册名、密码的安全，并独立承担由于人为过失原因导致密码泄露后产生的一切损失。
              <br />2.2) 除非有法律规定或司法裁定，且征得大麦晶城的同意。否则，账户和密码不得以任何方式转让、赠与或继承。对用户操作不当泄露账号密码给第三方造成的损失，您可以向侵权方追讨赔偿，大麦晶城不承担责任。
              <br />3.3) 如果用户发现所持有账户出现交易异常或账户安全受到威胁的情况，您应当立即通过有效方式通知本商城暂停该账号的使用权限并采取认为有必要的安全保护措施。因用户通知本商城不及时导致本商城封号迟缓给用户带来的一切损失，本商城不承担责任。除非用户有确凿证据表明是由于本商城的操作不当给用户造成了损失，本商城会承担相应责任。
              <br />4.4) 为方便您使用大麦晶城提供的服务及关联网站或其他组织的服务（以下称其他服务），您同意并授权大麦晶城将您在注册、使用大麦晶城提供的服务过程中提供、形成的信息传递给向您提供其他服务的关联公司或其他组织，或从提供其他服务的关联公司或其他组织获取您在注册、使用其他服务期间提供、形成的信息。
              <br />5.5) 您应确保您的每次登录和离开本商城都按照正常操作进行。因为您本人没有按照正常流程操作而造成的各种损失，大麦晶城不承担任何责任。
            </p>
            <h5>4.4、账户信息管理</h5>
            <p>
              <br />本商城承诺尊重用户隐私，保护用户非公开信息的安全。所以，本商城一定不会在未经合法用户授权时公开、编辑或透露其注册资料及其保存在本商城中的非公开内容。除以下情况会对用户账号和信息做出适当处理：
              <br />1.1) 用户授权本商城透露这些信息。
              <br />2.2) 相应的法律及程序要求本商城提供用户的资料。
              <br />3.3) 保护大麦晶城其他用户和公众的权益或个人安全。
              <br />4.4) 本商城有合理的理由认为特定用户或某些具体交易事项可能存在重大违法或违约情形。
            </p>
            <h5>5.5、大麦晶城网站服务使用规范：</h5>
            <p>
              <br />用户同意严格遵守以下条款：
              <br />1.1) 本协议条款是处理双方权利义务的约定，除非违反国家强制性法律，否则始终有效。
              <br />2.2) 依据国家相关法律法规规章制定，用户不得利用本商城从事非法活动；不能干扰或混乱网络服务；遵守所有使用网络服务的网络协议、规定、程序和惯例；
              <br />3.3) 只有大麦晶城的注册用户才可以在大麦晶城上进行交易活动。大麦晶城有权审核用户发布或删除用户提交的信息。所有的用户对其发布信息的准确性、完整性、即时性、合法性都独立承担所有责任，大麦晶城尽可能检查用户提交的信息，但不能完全保证所有信息的准确性和合法性，同时也不承担由此引至的任何法律责任。
              <br />4.4) 用户不得利用本商城及关联的一切渠道从事非法交易行为；不得利用本商城及关联的一切信息渠道制造、滥发、传播包括但不限于谣言、重复信息、诋毁行业或他人的信息或是损害公众利益、违反相关法律以及威胁国家安全的信息。
              <br />5.5) 用户不得利用本商城及相关联的信息平台攻击、盗取他人密码账号，侵犯第三方权利。
              <br />6.6) 如果您在本商城上的行为构成犯罪或侵犯了第三方的权利，使本商城蒙受索赔、处罚、诉讼等损失，您需就您的违规行为给本商城带来的一切直接和间接损失进行赔偿。
              <br />7.7) 大麦晶城保留因您违反上述条例而给大麦晶城造成损失的追诉权利。
              <br />8.8) 对于您提供的资料及数据信息，您授予大麦晶城及其关联公司独家的、全球通用的、永久的、免费的许可使用权利 (并有权在多个层面对该权利进行再授权)。此外，大麦晶城及其关联公司有权(全部或部份地) 使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据（包括但不限于注册资料、交易行为数据及全部展示于大麦晶城的各类信息）或制作其派生作品，并以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。
            </p>
            <h5>6.6、终止协议或限制访问</h5>
            <p>
              <br />1.1) 您同意，大麦晶城有权对您是否违反上述承诺做出单方认定，并根据单方认定结果适用规则予以处理或终止向您提供服务，且无须提前通知或征得您以及其他任何第三方的同意。
              <br />2.2) 经国家行政或司法机关的生效法律文书确认您存在违法或侵权行为，或者大麦晶城根据自身的判断，认为您的行为涉嫌违反本协议和/或规则的条款或涉嫌违反法律法规的规定的，则大麦晶城有权公示您的该等涉嫌违法或违约行为及大麦晶城对您采取的措施。
              <br />3.3) 终止您的账户服务的同时您将不能继续在大麦晶城以及相关公司内使用任何服务；同时您的注册资料及所有相关信息均会被删除或丢弃。
              <br />4.4) 您有权向大麦晶城要求注销您的账户，经大麦晶城审核同意后，会注销您的账户。终止您的服务后，大麦晶城有权保留您在商城活动时的交易记录， 大麦晶城没有义务为您保留或披露您当初在本商城的任何信息或者将您未曾阅读或发送过的信息转发给您或第三方。
            </p>
            <h5>7.7、责任限制</h5>
            <p>
              <br />本商城不承担因超出本商城合理控制之外的原因而造成本商城延迟或未能履约出现的损失，包括但不限于一切不可抗力，如自然灾害，罢工或骚乱，政府行为，战争，系统崩溃或其他严重故障等情况。本商城会尽可能的处理善后事宜，尽最大努力挽回客户损失。
            </p>
            <h5>8.8、管辖法律和适用</h5>
            <p>
              <br />本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决。协商不成时，任何一方均可向人民法院提起诉讼，并由本公司所在地的中华人民共和国法院管辖。
              版权声明 大麦晶城内的所有内容版权属北京晶圆电子有限公司所有，严禁未经大麦晶城书面许可的任何形式的部分或全部拷贝。
            </p> -->
            <div style="text-align:center;">
              <br />
              <el-checkbox v-model="hasReading">
                我已阅读并接受《
                <strong class="blu">{{title}}供应商申请入驻协议</strong>》
              </el-checkbox>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./UpgradeLevel.less";
</style>
<script>
// import "@/assets/css/ele-form.less";
// import "@/assets/css/label-checkbox.less";
import { baseURL,baseURL4 } from "@/config";
import { mapState, mapActions } from "vuex";
import { formatDateTime } from "@/lib/utils";
import VDistpicker from "v-distpicker";
import { axios, FactoryEntry } from "../../../api/apiObj";
export default {
  name: "UpgradeLevel",
  data() {
    return {
      hasReading:false,
      showXieyi:false,
      count: 0,
      showRequireBtn: false,
      showSetForm: false,
      reCompanyInfo: {},
      checkboxChangeValue: false,
      checkboxChangeValue2: false,
      dialogImageUrl: "",
      // 示例图
      identityExam: require("@/assets/image/OriginalFactoryEntry/timg.jpg"),
      zheng: require("@/assets/image/OriginalFactoryEntry/zheng.jpg"),
      fan: require("@/assets/image/OriginalFactoryEntry/fan.jpg"),
      // 预览图片
      dialogVisible: false,
      province: "",
      city: "",
      area: "",
      taxUrlList: [],
      idUrlBList: [],
      idUrlAList: [],
      businessList: [],
      // 基本信息
      ruleForm: {
        // // 公司注册名称
        // companyName: "",
        // // 工商营业执照注册号
        // no: "",
        // // 法定代表人
        // operName: "",
        // // 公司成立时间
        // startDate: "",
        // // 注册资本
        // registCapi: "",
        // // 营业开始时间
        // tremsStart: "",
        // // 营业结束时间
        // termsEnd: "",
        // // 企业负责人
        // conName: "",
        // // 企业负责人手机号
        // telephone: "",
        // // 公司所在地
        // companyaddress: "",
        // // 公司详细地址
        // address: "",
        // // 营业执照有效期开始时间
        // businesslicensestarttime: "",
        // //  企业营业执照结束时间
        // businesslicenseendtime: "",
        // // 营业执照是否长期
        // businesshours: "",
        // // 资质图上传
        // qualificationmapimg: [],
        // // 身份证
        // peopleId: "",
        // // 身份证正面
        // idUrlA: "",
        // // 身份证反面
        // idUrlB: "",
        // // 一般纳税人资格上传
        // taxUrl: [],
        // 入驻类型
        residencetype: "4"
      },

      // 基本信息验证
      rules: {
        address: [
          { required: true, message: "请输入公司注册地址", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          {
            min: 3,
            message: "公司名称名称最小为3个字符",
            trigger: "blur"
          }
        ],
        no: [
          { required: true, message: "请输入社会统一信用代码", trigger: "blur" }
        ],
        operName: [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        conName: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        startDate: [
          {
            type: "string",
            required: true,
            message: "请选择成立日期",
            trigger: "change"
          }
        ],
        registCapi: [
          { required: true, message: "请输入注册资本", trigger: "blur" }
        ],
        tremsStart: [
          {
            type: "string",
            required: true,
            message: "请选择营业开始时间",
            trigger: "change"
          }
        ],
        termsEnd: [
          {
            type: "string",
            required: true,
            message: "请选择营业结束时间",
            trigger: "change"
          }
        ],
        conName: [
          { required: true, message: "请输入企业负责人", trigger: "blur" }
        ],
        telephone: [
          {
            required: true,
            message: "请输入企业负责人手机号",
            trigger: "blur"
          },
          { min: 11, message: "手机号最小为11个字符", trigger: "blur" }
        ],

        // businesslicenseaddr: [
        //   { required: true, message: "请输入营业照所在地", trigger: "blur" },
        //   { min: 2, message: "营业照所在地最小为2个字符", trigger: "blur" }
        // ],
        // businesscope: [
        //   { required: true, message: "请输入营业范围", trigger: "blur" },
        //   { min: 2, message: "营业范围最小为2个字符", trigger: "blur" }
        // // ],
        // companyaddress: [
        //   { required: true, message: "请输入公司所在地", trigger: "blur" },
        //   { min: 2, message: "公司所在地最小为2个字符", trigger: "blur" }
        // ],
        address: [
          { required: true, message: "请输入公司详细地址", trigger: "blur" }
        ],
        // businesslicensestarttime: [
        //   {
        //     type: "string",
        //     required: true,
        //     message: "请输入有效期开始时间",
        //     trigger: "blur"
        //   }
        // ],
        // businesslicenseendtime: [
        //   {
        //     type: "string",
        //     required: true,
        //     message: "请输入有效期结束时间",
        //     trigger: "blur"
        //   }
        // ],
        url: [
          {
            required: true,
            message: "请上传营业执照图",
            trigger: "blur"
          }
        ],
        peopleId: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          }
        ],
        idUrlA: [
          {
            required: true,
            message: "请上传身份证正面",
            trigger: "blur"
          }
        ],
        idUrlB: [
          {
            required: true,
            message: "请上传身份证反面",
            trigger: "blur"
          }
        ],
        taxUrl: [
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
  mounted() {
    if (this.applyDetailEdit.id) {
      this.ruleForm = this.applyDetailEdit;
      this.taxUrlList.push({
        url: baseURL4 + this.applyDetailEdit.url
      });
      this.idUrlBList.push({
        url: baseURL4 + this.applyDetailEdit.idUrlB
      });
      this.idUrlAList.push({
        url: baseURL4 + this.applyDetailEdit.idUrlA
      });
      this.businessList.push({
        url: baseURL4 + this.applyDetailEdit.url
      });
     
    }
    this.ruleForm["residencetype"] = "4";
    this.ruleForm = Object.assign({}, this.ruleForm);
  },
  computed: {
    ...mapState({
      zhizhao:state=>state.zhizhao,
      applyDetailEdit:state=>state.applyDetailEdit
    }),
    access_token() {
      return sessionStorage.getItem("access_token");
    },
    requestUrl() {
      return (
        baseURL +
        `api-b/vipApply/uploadPicture?access_token=${this.access_token}&fileSource=QINIUYUN&type=5&id=1`
      );
    }
  },

  methods: {
    ...mapActions("OriginalFactoryEntry", ["GetInsertBrandReview"]),
    handleInput() {
      let obj = this.ruleForm.creditCode;
      obj = obj.replace(/[\W]/g, "").toUpperCase();
      this.$set(this.ruleForm, "creditCode", obj);
      if (obj.length == 18) {
        if (this.count < 1) {
          console.log("shixian");
          this.showRequireBtn = true;
        } else {
          this.showSetForm = true;
        }
      }
    },
    handleInputNum() {
      let obj = this.ruleForm.peopleId;
      obj = obj.replace(/[\W]/g, "");
      this.$set(this.ruleForm, "peopleId", obj);
    },
    getCompanyInfo() {
      let creditCode = this.ruleForm.creditCode;
      axios
        .request({
          ...FactoryEntry.queryCompnayInfo,
          params: {
            creditNo: this.ruleForm.creditCode
          }
        })
        .then(res => {
          console.log(res);
          if (res.data) {
            this.ruleForm = {
              ...this.ruleForm,
              ...res.data,
              creditCode: creditCode
            };
          }
          this.count++;
          this.showRequireBtn = false;
        });
    },
    // 平台入驻的确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.hasReading) {
            this.$message({
              message: "请先阅读并接受月结白条申请协议",
              type: "warning"
            });
            this.showXieyi = true;
            return;
          }
          axios
            .request({
              ...FactoryEntry.vipApply,
              method: "post",
              data: this.ruleForm
            })
            .then(res => {
              this.$message.success("提交成功");
              this.$router.push("/PersonalCenter/GetVipApplyDetail");
            });
        } else {
          this.$message.error("请完善信息！");
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
    successUpload1(res) {
      console.log(res);
      console.log(this.ruleForm);
      this.ruleForm.url = res.data;
      // let ret = this.ruleForm.qualificationmapimg instanceof Array;
      // if (ret) {
      //   this.ruleForm.qualificationmapimg.push(response.name);
      // } else {
      //   this.ruleForm.qualificationmapimg = this.ruleForm.qualificationmapimg.split(
      //     "@"
      //   );
      //   this.ruleForm.qualificationmapimg.push(response.name);
      // }

      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },

    // 身份证正面
    successUpload2(response) {
      this.ruleForm.idUrlA = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 身份证反面
    successUpload3(response) {
      this.ruleForm.idUrlB = response.data;
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    // 纳税资格人上传
    successUpload4(res) {
      console.log(res);
      this.ruleForm.taxUrl = res.data;
      //   return;
      // let ret = this.ruleForm.taxUrl instanceof Array;
      // if (ret) {
      //   this.ruleForm.taxUrl.push(response.name);
      // } else {
      //   this.ruleForm.taxUrl = this.ruleForm.taxUrl.split("@");
      //   this.ruleForm.taxUrl.push(response.name);
      // }
      this.$message({
        message: "上传成功!",
        type: "success"
      });
    },
    handleRemove1() {
      this.ruleForm.url = "";
    },
    handleRemove2() {
      this.ruleForm.idUrlA = "";
    },
    handleRemove3() {
      this.ruleForm.idUrlB = "";
    },
    handleRemove4(file) {
      //将要删除的文件
      console.log(file);
      this.ruleForm.taxUrl = "";
    },
    distpicker(x) {
      this.ruleForm.companyaddress = `${x.province.value}/${x.city.value}/${x.area.value}`;
    },
    dateChange(x) {},
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

