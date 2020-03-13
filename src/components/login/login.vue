.<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="750px" class="loginCont">
      <div class="item">
        <div class="left">
          <img src="http://brand.113ic.com/8904e4fe85564325847710fe9d3f3277.jpg" alt />
          <div class="title">
            <div class="gray desc">welcome to</div>
            <span class="name">大麦晶城ICMap</span>
            <div class="intro">
              <!-- <span class="line">---</span> -->
              <span class="little">共享低价、交易透明</span><br>
              <!-- <span class="little"></span><br> -->
              <span class="little">实时快捷、精准服务</span><br>
              <!-- <span class="little"></span> -->
            </div>
            <!-- <p class="de"><i>特价直通车，平台0差价</i></p> -->
          </div>
        </div>
        <div class="right">
          <div v-show="loginType===1" class="wrap">
            <div id="wechat_redirect" v-show="loginType===1"></div>
          </div>
          <div class="form-con-list wrap" v-if="loginType===3">
            <p class="type">
              <span>欢迎来到大麦晶城，10秒内急速注册成功！</span>
            </p>
            <div class="tel">
              <el-input v-model="phoneLoginValue" placeholder="手机号码"></el-input>
            </div>
            <div class="code">
              <el-input v-model="phoneCode" placeholder="验证码"></el-input>
              <span v-if="count <= 0" class="spa bgColor" @click="sendPhoneCode">发送验证码</span>
              <span v-else class="spb bgGray">{{count}}s后重新发送</span>
            </div>
            <div style="display:flex;align-items:center" v-if="isNew">
              <el-checkbox v-model="ischecked" style="margin-right:2px;"></el-checkbox>请先阅读并同意《
              <a class="blu" @click="showitem0=true">大麦晶城用户协议</a>》和《
              <a class="blu" @click="showitem1=true">隐私政策</a>》
            </div>
            <div class="submit-login" @click="LoginPhone" v-if="!isNew">登 录</div>
            <div class="submit-login bgColor" @click="bindPhone" v-if="isNew">绑定</div>
          </div>
          <div v-if="loginType==2" class="wrap">
            <iframe
              :src="qqSrc"
              frameborder="0"
              scrolling="no"
              width="100%"
              height="380px"
              v-if="loginType==2"
            ></iframe>
          </div>
          <div class="logintypeSel" :class="loginType==2?'qq':''">
            <p class="desc">切换不同的登录方式</p>
            <img
              src="@/assets/image/icon/weixin.png"
              alt
              @click="wxLogin"
              :class="loginType==1?'active':''"
            />
            <img
              src="@/assets/image/icon/qq.png"
              alt
              @click="qqLogin"
              :class="loginType==2?'active':''"
            />

            <img
              src="@/assets/image/icon/phone.png"
              alt
              @click="phLogin"
              :class="loginType==3?'active':''"
            />
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showitem0" width="62%" :center="true" top="6vh" class="xieyiwrap">
      <h3 slot="title">大麦晶城用户协议</h3>
      <div class="cont">
        <div
          class="item"
        >欢迎使用大麦晶城平台提供的服务，《大麦晶城用户协议》(以下简称“本协议”)是您(或称“用户”，指注册、登录及使用本服务的个人或组织)与北京晶圆电子有限公司关于大麦晶城网站 (www.icmap.cn，简称本网站)与大麦晶城提供的产品、程序及服务所订立的协议。</div>
        <div>【审慎阅读】大麦晶城在此特别提醒您认真阅读、充分理解本协议中各条款，特别是免除或者限制责任的条款、法律适用和管辖条款，尤此类条款将以加粗的形式提示。大麦晶城平台的法律声明、平台规范、通知、公告、针对个别商品或服务所公示的规则等均为本协议的组成部分，与本协议不可分割且具有同等法律效力。</div>
        <div
          class="item"
        >如您同意本协议并完成全部注册程序，即表示您已充分阅读、理解并接受本协议的全部内容，并与大麦晶城之间达成一致，成为大麦晶城用户。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</div>
        <div class="tit">一、定义</div>
        <div
          class="item"
        >大麦晶城(简称“晶城”)是北京晶圆电子有限公司运营的网络交易平台，为所有入驻大麦晶城平台的商家与用户之间的商品交易提供网络交易场所、技术支持及平台服务。本协议项下，大麦晶城平台运营主体可能根据平台业务调整而发生变更，变更后的平台运营主体与您共同履行本协议并向您提供服务，大麦晶城平台运营主体的变更不会影响您本协议项下的权益。</div>
        <div
          class="item"
        >第三方商家(简称“商家”)是指通过大麦晶城平台发布和销售商品，并最终和用户完成交易的主体，是商品提供方和销售方。第三方商家利用大麦晶城网站平台依法开展经营活动，独立进行订单处理、物流配送、售后服务，对其在大麦晶城的经营活动独立承担法律责任。</div>
        <div class="tit">二、用户使用规则</div>
        <div
          class="item"
        >2.1【帐号注册】您无需用户帐号即可浏览本网站。如果您想使用本网站更多功能与服务，您必须注册大麦晶城帐号，您对大麦晶城帐号的注册、使用行为应符合《大麦晶城用户协议》。</div>
        <div class="item">2.2【隐私政策】在任何时候，您的个人和公司信息均依照平台的《隐私政策》处理，该政策也是本协议不可分割的一部分。</div>
        <div
          class="item"
        >2.3【用户资格】在注册、登录及使用大麦晶城平台服务过程中，用户应当是具备中华人民共和国法律规定的与您行为相适应的民事行为能力。此外，您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象，否则您可能无法正常注册及使用平台服务。</div>
        <div
          class="item"
        >2.4【禁止性信息】您将不会通过平台发送或传播含有法律、行政法规禁止性信息。否则，大麦晶城可对您发布的信息依法或依本协议进行删除或屏蔽，并有权视情节采取警告、限期改正、暂停服务、取消订单、禁止交易等措施。此类信息包括但不限于:</div>
        <div class="item">(1)反对宪法所确定的基本原则的;</div>
        <div class="item">(2)危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一、损害国家荣誉和利益的;</div>
        <div class="item">(3)煽动民族仇恨、民族歧视，破坏民族团结的;</div>
        <div class="item">(4)破坏国家宗教政策，宣扬邪教和封建迷信的;</div>
        <div class="item">(5)散布谣言，扰乱社会秩序，破坏社会稳定的;</div>
        <div class="item">(6)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;</div>
        <div class="item">(7)恐吓、侮辱、攻击、诽谤他人，侵害他人合法权益的;</div>
        <div class="item">(8)利用本网站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动的;</div>
        <div class="item">(9)发布任何侵犯他人著作权、商标权等知识产权及其他合法权利的;</div>
        <div class="item">(10)含有法律、行政法规禁止的其他内容的。</div>
        <div class="tit">三、平台服务规范</div>
        <div
          class="item"
        >3.1【商品购买】大麦晶城是网络交易平台，对于明确标明为第三方商家提供的商品，由第三方商家独立进行商品发货和售后服务，除原厂供应商外，购物发票将于大麦晶城（北京晶圆电子有限公司）统一负责开具，商家并对其在大麦晶城的经营活动独立承担法律责任，平台不承担前述义务及责任，但法律法规另有规定除外。不对第三方商家提供的商品的适用性或满足用户特定需求及目的进行任何明示或者默示的担保，商品的质量保证责任和服务承诺由第三方商家自行向用户承担。</div>
        <div
          class="item"
        >3.2【商品缺货】由于市场变化及各种以合理商业努力难以控制的因素的影响，如您提交的订单信息中选购 的商品出现无库存现象，您有权取消该商品订单。若您已经付款，则由大麦晶城为您办理退款。订单取消后，您已支付的款项将退回您的付款账户。您理解并认可，退款时间会因不同支付平台、支付方式等原因而有差异。</div>
        <div
          class="item"
        >3.3【商品区域限制】大麦晶城平台上提供的部分商品可能仅限于在中国大陆地区使用，因其在包装、产品制式、市场准入要求、质量认证、语言、用户使用习惯、维保服务等方面仅能满足中国大陆地区有关法律 法规的要求。</div>
        <div
          class="item"
        >3.4【付款方式】大麦晶城实行先付款后发货的方式，用户需在订单生成后24小内使用在线支付、对公转账、月结白条进行支付。付款方式将在大麦晶城平台予以公示。用户应在确认订单时，选择对应付款方式，并严格按照已选择的方式付款。月结白条需在用户中心先完成申请后根据所批复的额度内进行白条支付，若额度不足，可切换到在线支付或对公转账方式进行付款；用户未能在平台规定时间(24小时)内完成付款的，晶城有权取消您的订单。</div>
        <div
          class="item"
        >3.5【支付】大麦晶城提供的三种支付方式：在线支付(微信和支付宝)、对公转账和月结白条支付。其中，用户理解并确认在线支付服务由具备合法资质的第三方为用户提供，该等支付服务的使用条件及规范由用户与支付服务提供方确定，与大麦晶城无关。对公转账请严格按照平台上提供的公司帐号进行转换，平台将按照付款公司提供发票，并不得更改。使用月结白条用户需要在每一次下单时上传公司签章后的采购合同，后台审批后方可以进行白条支付；</div>
        <div
          class="item"
        >3.6【订单成立】大麦晶城平台上展示的商品及其价格、规格等信息仅供用户浏览参考，用户下单时须填写希望购买的商品和数量、支付方式、收货人、联系方式、收货地址等具体内容，系统将根据用户填写的前述必要信息自动生成相应订单，用户确认无误后可提交订单。您在大麦晶城平台上提交订单并进行了支付，方视为您与平台和商家之间就您已付款的商品建立了合同关系。在商家与您的订单成立之前，您与大麦晶城均有权取消相关产品的订单。</div>
        <div
          class="item"
        >3.7【价格显示】大麦晶城产品会尽可能提供该商品的官方参考价，该价格仅参考的意义，平台不对此价格做任何解释。成交价格以用户下单时页面显示为准，大麦晶城对于平台内销售的任何产品均不提供价格保护。营销活动期间，商家将按照页面公示的营销活动规则进行商品促销，如出现促销期结束后同一商品降价，平台将不会对用户进行任何形式补偿。</div>
        <div
          class="item"
        >尽管大麦晶城最大的努力以确保商品价格的准确性，但是商品价格偶尔会有定价错误。如果某一商品 的正确定价高于大麦晶城平台显示的定价，或者由于系统结算错误导致订单价格有误，大麦晶城有权根据具体情况决定,联系您咨询您的意见, 或者取消您的订单、解除合同并通知您。</div>
        <div
          class="item"
        >3.8【信息监控】大麦晶城平台上的商品和服务的价格、数量等信息将按商家发布可能随时发生变动，平台有权对商品信息进行及时的监测、修改或删除。如大麦晶城发现相关页面上包括但不限于商品名称、价格或数量等关键信息存在标注错误的，大麦晶城有权通知商家进行调整。鉴于平台上商品和服务信息数量极其庞大，虽然大麦晶城会尽最大努力保证用户所浏览商品/服务信息的准确性，但无法逐一审查交易所涉及的商品或服务的质量、安全以及合法性、真实性、准确性，对此您应谨慎判断。</div>
        <div class="item">3.9【恶意购买】在商品未出库或未签收之前, 若发生以下任一情形，大麦晶城有权单方面原路退款到支付账户，并取消订单:</div>
        <div class="item">(1)订单为非正常流程产生，包括但不限于违规参与限购活动、以非法软件破坏订单生成程序等;</div>
        <div class="item">(2) 订单生成后，因该用户的帐号权属产生争议或纠纷，当事人无法就争议达成一致，并且大麦晶城收到相关凭证;</div>
        <div class="item">(3)通过不正当手段(如外挂工具、网络攻击等)下单谋取利益；</div>
        <div class="item">(4)其它大麦晶城认为通过不正当手段进行刷单的情形。</div>
        <div
          class="item"
        >3.10 【优惠券使用】用户购买产品时所使用的优惠券，一经使用即无效，在任何情形下均不再退回至用户账户。关于优惠券是否因使用而无效，如有特殊使用规则，则按照特殊规则处理。</div>
        <div
          class="item"
        >3.11【买赠活动】用户退货时应当将商品本身、配件及赠品一并退回。赠品包括赠送的实物、晶豆、优惠券等。如果赠品不能一并退回，您应当按照大麦晶城的要求支付相应赠品价款。</div>
        <div class="item">3.12【评价规则】大麦晶城保留删除平台上各类不符合法律法规或不真实或与本次购买商品行为无关的信 息内容。</div>
        <div
          class="item"
        >3.13【收货信息】为了快速准确地进行商品配送，用户需填写详细准确的收货人姓名、收货人电话、收货 地址等信息，并保持通信工具畅通。如果因为您填写的收货人姓名、收货人电话、收货地址等信息错误， 由此造成的损失由用户自行承担。 因如下情况造成订单延迟配送或无法配送的，大麦晶城不承担配送责任，并保留单方取消订单的权利:</div>
        <div class="item">(1)用户提供的收货信息不真实、不准确或不完整;</div>
        <div class="item">(2)货物送达后无人签收;</div>
        <div class="item">(3)和收货人联系不上时，如收货人电话停机或不接听电话;</div>
        <div class="item">(4)第三方原因或不可抗力因素导致的，例如:自然灾害、交通戒严、骚乱、突发战争等。</div>
        <div
          class="item"
        >3.14【送货时间】系统会根据不同订单类型而确定是否推送及显示送货时间，如有显示，则订单信息中列 出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基 础上估计得出，不属于承诺到货时间，也不等于实际到货或完成安装时间。您知悉平台上因缺货造成的产 品送达迟延，或因为交通、天气、政府原因、大型活动等不可抗力及第三方原因延误，建议您登录大麦晶城到订单详情页关注订单进度。您理解并接受对于前述配送延迟情形，大麦晶城对此不承担配送延迟责任。</div>
        <div
          class="item"
        >3.15【售后服务】商家将根据国家法律法规相关规定及大麦晶城平台上公布的售后规则向用户提供售后保 障。同时，大麦晶城平台仅在中国大陆地区向您提供售后服务，如您携带在大麦晶城平台购买的商品出关，大麦晶城无义务提供任何协助出关的任何信息。</div>
        <div class="item">四、用户信息保护及授权</div>
        <div
          class="item"
        >4.1【个人信息保护】大麦晶城将按照隐私政策收集、使用、处理您的个人信息。按照适用法律，对于您的个人信息，您享有查询、更正、删除以及注销服务或帐号的权利，具体流程请参见隐私政策。</div>
        <div
          class="item"
        >4.2【信息保存】个人信息在完成收集目的后，大麦晶城将停止保留数据，或进行脱敏、去标识化处理。 但是按照《中华人民共和国电子商务法》的相关规定，大麦晶城应当保存交易信息至交易完成之日起三年，但大麦晶城不会再处理您的此部分交易信息，法律、行政法规另有规定除外。</div>
        <div class="item">4.3【信息披露】我们不会与大麦晶城(及相关关联公司或者相关服务提供的主体)以外的任何公司、组织和个人共享您的个人信息，但以下情况除外:</div>
        <div class="item">(1)事先获得您明确的同意或授权;</div>
        <div
          class="item"
        >(2)根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况下进行提供，包括 但不限于有关主管部门按照《中华人民共和国电子商务法》要求大麦晶城提供有关电子商务数据信息(其 中包含部分个人信息)的。</div>
        <div
          class="item"
        >4.4【微信小程序】在特定场景下用户可以选择用自己已有的微信帐号登录大麦晶城，用户使用微信号登录可直接关联大麦晶城帐号，大麦晶城会获取一些用户在这些平台上的信息。鉴于此用户在进行以上操作时代表您已同意大麦晶城获取您在这些门户网站、社交平台上的信息。</div>
        <div
          class="item"
        >4.5【授权使用】对于您提供、发布及在使用大麦晶城平台服务中形成的除个人信息外的文字、图片、视频、 音频等非个人信息，在法律规定的保护期限内您免费授予大麦晶城及其关联公司获得全球排他的许可使用权利及再授权给其他第三方使用并可以自身名义对第三方侵权行为取证及提起诉讼的权利。您同意大麦晶城及其关联公司存储、使用、复制、修订、编辑、发布、展示、翻译、分发您的非个人信息或制作其派生
        作品，并以已知或日后开发的形式、媒体或技术将上述信息纳入其它作品内。
        为方便您使用大麦晶城平台等其他相关服务，您授权大麦晶城将您在帐户注册和使用大麦晶城平台服务过程中提供、形成的信息传递给其他相关服务提供者，或从其他相关服务提供者获取您在注册、使用相关服务期间提供、形成的信息。</div>
        <div class="tit">五、免责声明</div>
        <div
          class="item"
        >5.1【第三方产品责任】第三方商家通过大麦晶城平台销售商品、提供服务，大麦晶城仅为第三方商家提供网络平台服务，另外，大麦晶城提供连接到关联公司和其他企业网站的链接。因第三方商家或第三方公司宣传承诺及提供商品或服务质量的不可控性，大麦晶城将免费为用户提供质量的初步检验和筛查，最终是否合格以用户判断为准；对于第三方仅提供互联网平台或推广服务，相应的产品、服务责任由该产品、服务的提供者向用户承担。</div>
        <div
          class="item"
        >5.2【出口管制】大麦晶城有权拒绝向被联合国、美国、欧盟及其他国家的列入黑名单的国家、地区及任何 机构或个人发送违禁商品。如果您受制于美国的制裁，或受制于您正在使用的大麦晶城服务所在地之国家政府施行的、与美国法律一致的制裁，您有可能无法使用大麦晶城提供的服务。</div>
        <div
          class="item"
        >5.3【谨慎交易】在您未发出明确的服务需求的情形下，大麦晶城不会主动以电话或其他形式主动向您提供 有偿服务，如您接受上述服务，大麦晶城对该服务不承担任何责任。</div>
        <div
          class="item"
        >5.4【不可抗力及第三方原因】大麦晶城依照法律规定履行相关义务，但对于下述原因导致的合同履行障碍、 履行瑕疵、履行延后或履行内容变更等情形，大麦晶城并不承担违约责任: (1)因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素; (2)因电力供应故障、通讯网络故障等公共服务因素或任何由于黑客攻击，电脑病毒的侵入，非法内容信 息、骚扰信息的屏蔽，政府管制以及其他任何网络、技术、通信线路、信息安全管理措施等原因造成的服 务中断、受阻等不能满足您要求的情形; (3)在大麦晶城已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与 数据安全等因素。</div>
        <div class="tit">六、知识产权</div>
        <div class="item">6.1【知识产权保护】您使用晶城帐号及大麦晶城平台服务的行为应符合《大麦晶城使用协议》等相关协议 关于知识产权的约定。</div>
        <div
          class="item"
        >6.2【知识产权许可】您在使用大麦晶城平台服务时利用帐号发表上传的文字、图片、视频、软件以及表演等原创信息的知识产权归您所有，但是您确认您对该等信息的发表、上传行为视同为对大麦晶城品非独占地、永久地、不可撤销地授予该等信息相关全部知识产权的使用、复制等权利，并且您同意大麦晶城可转授权上述权利。</div>
        <div
          class="item"
        >6.3【知识产权归属】除非经过大麦晶城的在先书面同意，您未获得权利使用大麦晶城的任何知识产权。 您保证、陈述并承诺您尊重大麦晶城的知识产权。您不会以自己名义或促使第三方，也不会同意或放任任何第三方，为了其任何营销、广告、促销或其他目的，在任何法域、以任何方式申请与大麦晶城或大麦晶城关联公司商标相似的商标、域名、无线网站、互联网搜索词或任何商号、服务标志。如出现上述情况，您须将所有相关权利转让给大麦晶城，费用由您承担。如因您违反本条款约定而给大麦晶城造成损失的，该损失全部由您承担。</div>
        <div
          class="item"
        >6.4【侵权处理】您在大麦晶城发布的信息不得侵犯任何第三人的知识产权，未经具有相关所有权人之事先 书面同意，您不得以任何方式上传、发布、修改、传播或复制任何受著作权保护的材料、商标或属于其他 人的专有信息。如您认为大麦晶城平台上的商品或其他信息侵犯了您的知识产权，请按照大麦晶城平台上 公布的知识产权保护规则及流程处理。</div>
        <div class="tit">七、变更与终止</div>
        <div
          class="item"
        >7.1【变更】大麦晶城可根据国家法律法规变化及维护交易秩序、保护消费者权益需要，不时修改本协议、 补充协议，变更后的协议、补充协议(下称“变更事项”)将通过法定程序并以合理方式通知您。如您对已生效的变更事项仍不同意的，您应当于变更事项确定的生效之日起停止使用大麦晶城平台服务，变更事项对您不产生效力;如您在变更事项生效后仍继续使用大麦晶城平台服务，则视为您同意已生效的变更事项。</div>
        <div
          class="item"
        >7.2【终止】当您发生以下任一情况时，大麦晶城平台有权限制您的全部或部分权限(包括但不限于下单、 参加促销活动等)，取消相关未履行完毕的订单、解除合同，或者注销您的晶城帐号: (1)通过网络攻击、大量发布广告等行为影响网站正常经营或影响网站为其他用户提供服务; (2)多次在评论区或咨询区发布与所售商品或服务无关的信息，或多次恶意进行负面评价，违反平台信用 评价制度的; (3)通过不正当手段(如外挂工具、网络攻击、盗刷银行卡等方式)或其他违法、侵犯第三人利益的方式 谋取利益; (4)利用销售方过错或失误进行恶意索赔、投诉达两次或以上，或者无故对客服人员进行辱骂、人身攻击; (5)非因商品/服务质量原因，短期内多次拒收商品或拒绝接受服务; (6)通过帐号从事索赔或转售业务的(如批发、零售); (7)您提供的订单信息(包括但不限于姓名、电话、身份证号、电子邮箱等)不真实、不准确或不完整; (8)您有其他影响平台正常经营秩序或违法行为。</div>
        <div class="tit">八、其他</div>
        <div
          class="item"
        >8.1【有效联系方式】您应该提供真实有效的联系方式(包括您的电子邮件地址、联系电话、联系地址 等)，对于联系方式发生变更的，您有义务及时更新有关信息，并保持可被联系的状态。如果因提供的联系方式不确切，或不及时告知变更后的联系方式，使通知无法送达或未及时送达，由您自行承担后果。</div>
        <div
          class="item"
        >8.2【通知】向您浏览界面推送的弹窗、短信、微信等通知形式，也作为向您发出的有效通知。大麦晶城将向您的上述联系方式的其中之一或其中若干向您送达各类通知，而此类通知的内容可能对您的权利义务产生重大的有利或不利影响，请您务必及时关注。</div>
        <div
          class="item"
        >8.3【法律适用】本协议适用中华人民共和国法律。</div>
        <div  class="item">
          8.4【管辖】如果双方发生纠纷，应本着友好的原则协商解决;如协商不成，应向被告所在地有管辖权的法院提起诉讼。</div>
        <div class="item">8.5【独立性】若本协议中的某些条款因故无法适用，不影响本协议的其他条款继续适用。</div>
        <div style="text-align:center;font-weight:bolder;" >
           <el-button type="danger" >
             <el-checkbox v-model="checked0"  style="margin-right:2px;color:#fff"> 已阅读并同意</el-checkbox>
           </el-button>
          
          </div>
      </div>
    </el-dialog>
     <el-dialog title="隐私保护政策" :visible.sync="showitem1" width="62%" :center="true" class="xieyiwrap" top="6vh">
      <div class="cont">
      <div class="tit">个人信息</div>
      <div class="item">大麦晶城努力通过提供优质产品和服务获得顾客的满意及信任。为了实现这个目标，我们制定了下列措施，以保证公司网站不会泄露您的私人信息。</div>
      <div class="item">1、公司每个组织均指定了专人负责保护个人信息，以求妥善管理这些信息。</div>
      <div class="item">2、如果公司要求您提供或注册个人信息，例如姓名、地址、Email地址或电话号码，公司会告知您其用途以及咨询方式。公司要求您提交的限定在合适范围内的信息。</div>
      <div class="item">3、公司只会将您提供的信息用于您所同意的目的范围。</div>
      <div class="item">4、在未征得您事先同意的条件下，公司不会向第三方提供或透漏您的个人信息。在以下情况时，公司会提供个人信息：1）工作外包；或2）有其他正当理由。</div>
      <div class="item">5、如果您希望检查个人信息，可以联系您所提交或注册个人信息的网站联系。公司会尽快妥善应对您的要求。</div>
      <div class="item">6、公司努力采取合理的方式维护并提高安全性，以确保个人信息管理安全。</div>
      <div class="item">7、同样，根据依照法律及法规，公司将会不断改善并升级措施保护个人信息。</div>
      <div class="tit">温馨提示</div>
      <div
        class="item"
      >1、为遵循最新的法律、法规、政府政策及经济与运营变化，大麦晶城保留修改会籍制度的权利，会籍续延、终止时须遵循最新的会员制度。</div>
     
      <div
        class="item"
      >2、为了更好的享受会员权益，您必须按要求提供真实、准确、完整的个人资料。有关您个人的一切资料和信息，仅在大麦晶城使用，未经您许可不会向任何第三方泄露。</div>
      <div
        class="item"
      >3、当您的联系方式（特别是手机）或居住地址发生变更时，请您务必到大麦晶城网站及时更新信息，以免影响您接收各类活动资讯，及送货上门服务。</div>
      <div class="item">4、本公司有权基于单方判断，包含但不限于本公司认为您已经违反本协议的明文规定及精神，暂停、中断或终止向您提供本服务或其任何部分，并移除您的资料。</div>
     </div>
    </el-dialog>
    <el-dialog
  title="温馨提示"
  :visible.sync="showTishi"
  :center="true"
  width="870px"
  :modal-append-to-body="true"
  >
  <div class="tishi" style="height:250px;">
    <h3 class="color">恭喜您已成功注册成为大麦晶城的用户！</h3>
    <div class="">
      <p>1、您可以进入个人中心点击<strong>头像</strong>和<strong>昵称</strong>进行修改，每3个月内昵称可修改一次；</p>
      <p>2、为方便微信及时推送消息，可在个人中心关注微信公众号；若更改微信，可先取消关注，再进行关注；</p>
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">朕知道了</el-button>
    <el-button type="primary" @click="confirmTishi">去个人中心</el-button>
  </span>
</el-dialog>
  </div>
</template>
.<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { proBaseUrl } from "@/config";
export default {
  data() {
    return {
      showTishi:false,
      showitem0: false,
      showitem1: false,
      checked0: false,
      checked1: false,
      ischecked: false,
      dialogVisible: true,
      loginType: 1, //1：微信 2：qq 3:phone
      count: 0,
      timer: null,
      wxState: "",
      hasWxCode: false,
      isWX: true,
      openid: "",
      state: "",
      code: "",
      qqSrc: "",
      phoneLoginValue: "",
      phoneCode: "",
      phoneKey: "",
      isNew: false,
      isbingphone:false,
    };
  },
  mounted() {
    this.wxLogin();
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  watch: {
    checked0(){
      if(this.checked0 && this.checked1){
        this.ischecked=true
      }
    },
    checked1(){
      if(this.checked0 && this.checked1){
        this.ischecked=true
      }
    },
    dialogVisible(newval) {
      if (!newval) {
        this.setshowlogin(false);
      }
    },
    $route() {
      const code = this.$route.query.code;
      var _this = this;
      if (code) {
        this.hasWxCode = true;
        this.GetWxBack({
          state: this.wxState,
          code: code
        }).then(() => {
          var count = 60;
          this.timer = setInterval(() => {
            _this.GetWxSuccess(this.wxState).then(res => {
              _this.openid = res.openid;
              if (res.type == 1) {
                //新用户扫码注册，需要吊起来手机输入
                _this.loginType = 3;
                _this.count = 0;
                _this.isNew = true;
                clearInterval(this.timer);
              } else if (res.type == 2) {
                //老用户扫码登录
                _this
                  .GetSignIn({
                    isWX: _this.isWX,
                    openid: _this.openid,
                    state: _this.wxState
                  })
                  .then(res => {
                    sessionStorage.setItem("access_token", res.access_token);
                    sessionStorage.setItem("refresh_token", res.refresh_token);
                    let query = _this.$route.query;
                    delete query.code;
                    delete query.state;
                    this.$router.push({
                      path: _this.$route.path,
                      query: query
                    });
                    _this.setloginState(true);
                    _this.GetUserInforma();
                  });
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              } else {
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              }
              //else if(res.type==3 ){
              //   //二维码失效

              // }else if(res.type==4){
              //     //用户取消登录
              // }
            });
          }, 1000);
        });
      }
    }
  },
  methods: {
    ...mapActions("Login", [
      "GetQqLogin",
      "GetQqSuccess",
      "GetQqSendCode",
      "GetQqBindPhone",
      "GetSignIn",
      "GetPhoneLoginCode",
      "GetPhoneLogin",
      "GetPhoneSignIn",
      "GetWxLogin",
      "GetWxSuccess",
      "GetWxBack",
      "GetUserInforma"
    ]),
    ...mapMutations(["setloginState", "setshowlogin"]),
    
    //微信登录
    wxLogin() {
      this.isbingphone=false;
      this.loginType = 1;
      this.isWX = true;
      clearInterval(this.timer);
      this.count = 0;
      this.GetWxLogin().then(res => { 
        if (res) {
          this.wxState = res.state;
          this.state = res.state;
          let href =
            "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7Y29sb3I6I2ZmZn0NCi5pbXBvd2VyQm94IC5pbmZvIHtkaXNwbGF5OiBub25lO30=";
          // "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZTt9";
          let redirectUrl = proBaseUrl + "/#" + this.$route.path;
          let arr = res.url.split("?")[1].split("&");
          let appid = arr.find(item => {
              item.indexOf("appid");
              return item;
            });
          if (appid) {
            let obj = new WxLogin({
              self_redirect: false,
              id: "wechat_redirect",
              appid: appid.split("=")[1],
              scope: "snsapi_login",
              redirect_uri: encodeURIComponent(redirectUrl),
              state: this.wxState,
              style: "",
              href: href
            });
            let _this = this;
            this.count = 60;
            this.timer = setInterval(function() {
              if (_this.count == 0) {
                clearInterval(_this.timer);
              } else {
                _this.count--;
              }
            }, 1000);
          }
        }
      });
    },
    //qq登录
    qqLogin() {
      this.isbingphone=false;
      this.loginType = 2;
      this.isWX = false;
      var _this = this;
      clearInterval(this.timer);
      this.count = 0;
      this.GetQqLogin().then(res0 => {
        // 返回state
        this.state = res0.state;
        this.qqSrc = res0.url;
        this.count = 60;
        this.timer = setInterval(() => {
          this.count--;
          if (_this.count > 0) {
            _this.GetQqSuccess(res0.state).then(res => {
              _this.openid = res.openid;
              if (res.type == 1) {
                //新用户扫码注册，需要吊起来手机输入
                _this.loginType = 3;
                _this.count = 0;
                _this.isNew = true;
                clearInterval(this.timer);
              } else if (res.type == 2) {
                //老用户扫码登录
                _this
                  .GetSignIn({
                    isWX: _this.isWX,
                    openid: _this.openid,
                    state: _this.state
                  })
                  .then(res => {
                    sessionStorage.setItem("access_token", res.access_token);
                    sessionStorage.setItem("refresh_token", res.refresh_token);
                    _this.setloginState(true);
                    _this.GetUserInforma();
                  });
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              } else if (res.type == 4) {
                //用户取消登录
                _this.dialogVisible = false;
                clearInterval(_this.timer);
              } else if (res.type == 3) {
                //等待用户授权登录
              }
            });
          } else {
            clearInterval(_this.timer);
          }
        }, 1000);
      });
    },
    //新用户绑定手机号
    bindPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.phoneLoginValue)) {
        this.$message.info("手机号码有误，请重填");
        return false;
      }
      if(!this.ischecked){
          this.$message.info("请先认真阅读并接受大麦晶城用户协议和隐私政策");
        return false;
      }
      // if(!this.checked0){
      //   this.$message.info("请先认真阅读并接受大麦晶城用户协议");
      //   return false;
      // }
      //  if(!this.checked1){
      //   this.$message.info("请先认真阅读并接受隐私政策");
      //   return false;
      // }
      if(!this.phoneCode){
        this.$message.info("请输入有效的手机验证码");
        return false;
      }
      if(this.isbingphone){
        this.LoginPhone();
        return;
      }
      let obj = {
        isWX: this.isWX,
        phone: this.phoneLoginValue,
        key: this.phoneKey,
        state: this.state,
        code: this.phoneCode
      };
      this.GetQqBindPhone(obj).then(res => {
        if (res.resultCode === "200") {
          this.GetSignIn({
            isWX: this.isWX,
            openid: this.openid,
            state: this.state
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
           // this.dialogVisible = false;
           this.showTishi=true
            this.setloginState(true);
            this.GetUserInforma();
          });
        } else if (res.resultCode === "5001") {
          this.$confirm(res.message + ",是否合并账户信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.mergeAcount();
            })
            .catch(() => {
              console.log("取消合并");
            });
        } else if (res.resultCode === "400") {
          this.$message.error(res.message);
          this.count = 0;
        }
      });
    },
    //合并账户
    mergeAcount() {
      let obj = {
        isWX: this.isWX,
        phone: this.phoneLoginValue,
        key: this.phoneKey,
        state: this.state,
        code: this.phoneCode,
        flag: true
      };
      this.GetQqBindPhone(obj).then(res => {
        if (res.resultCode === "200") {
          this.GetSignIn({
            isWX: this.isWX,
            openid: this.openid,
            state: this.state
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.showTishi=true
           // this.dialogVisible = false;
            this.setloginState(true);
            this.GetUserInforma();
          });
        } else if (res.resultCode === "5001") {
          this.$confirm(res.message + ",是否合并账户信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.mergeAcount();
            })
            .catch(() => {
              console.log("取消合并");
            });
        } else if (res.resultCode === "400") {
          this.$message.error(res.message);
          this.count = 0;
        }
      });
    },
    //手机登录
    phLogin() {
      this.isbingphone=true;
      this.loginType = 3;
      clearInterval(this.timer);
      this.count = 0;
    
    },
    // 发送手机验证码
    sendPhoneCode() {
      console.log("isbingphone",this.isbingphone)
      if (!/^1[3456789]\d{9}$/.test(this.phoneLoginValue)) {
        this.$message.info("手机号码有误，请重填");
        return false;
      }
      this.count = 60;
      this.GetPhoneLoginCode({
        phone: this.phoneLoginValue
      }).then(res => {
        this.phoneKey = res.key;
        if(!this.isbingphone){
          this.isNew = true;
        }else{
          if (res.flag) {
            this.isNew = true;
          } else {
            this.isNew = false;
          }
        }
        
      });
      var _this = this;
      this.timer = setInterval(() => {
        _this.count--;
        if (_this.count == 0) {
          clearInterval(_this.timer);
        }
      }, 1000);
    },
    // 手机登录
    LoginPhone() {
        
      this.GetPhoneLogin({
        phone: this.phoneLoginValue,
        key: this.phoneKey,
        code: this.phoneCode
      }).then(res => {
        if (res.resultCode === "200") {
          this.GetPhoneSignIn({
            phone: this.phoneLoginValue,
            key: this.phoneKey,
            code: this.phoneCode
          }).then(res => {
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("refresh_token", res.refresh_token);
            this.setloginState(true);
            this.GetUserInforma();
            if(this.isNew){
              this.showTishi=true
            }else{
              this.dialogVisible = false;
            }
            //this.showTishi=true;
            
          });
        } else {
          // this.$message.error("登录失败!");
        }
      });
    },
    confirmTishi(){
      console.log("跳转")
      this.$router.push("/PersonalCenter");
      this.dialogVisible = false;
     // this.$router.push("/PersonalCenter")
    },
  }
};
</script>
.<style lang="less" scoped>
@import "./login.less";
</style>