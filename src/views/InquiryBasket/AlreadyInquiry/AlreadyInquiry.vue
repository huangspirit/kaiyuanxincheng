<template>
  <div class="AlreadyInquiry">
    <!-- 内容部分 -->
    <div class="already-con">
      <div class="already-con-tit">
        <ul class="already-con-tit-tab">
          <li class="active">全部</li>
          <li>已批复</li>
          <li>未批复</li>
          <li>已失效</li>
        </ul>
        <div class="select">
          <p>全部申请</p>
          <ul>
            <li>近一周</li>
            <li>近一月</li>
            <li>近一年</li>
            <li>近半年</li>
          </ul>
        </div>
        <SearchInput :placeholder="'在结果中搜索'" :width="383"></SearchInput>
      </div>
      <!-- 列表 -->
      <ul class="already-list">
        <li>
          <p class="tit">
            <span class="serial-num">1</span>
            <span class="code">293D106X9035D2TE3</span>
            <span class="fr">申请编号：1912-1985261</span>
          </p>
          <div class="application-price">
            <div class="application-price-l price-l">
              <img src="@/assets/image/inquirybasket/_u11948.png" alt />
              <div>
                <router-link to="/BrandDetail/GoodsDetails" tag="p">
                  <span class="name">CDHDFJHKS-234J</span>
                </router-link>
                <router-link to="/BrandDetail" tag="p">
                  <span>品牌：</span>罗彻斯特电子
                </router-link>
                <p>
                  <span>型号描述：</span>
                  The 7721-7PPSG is an Insulating Shoulder Washer made of 40% glass filled polyphenylene sulfide (PPS) body. Its recommended .
                </p>
              </div>
            </div>
            <div class="application-price-m price-m">
              <p>
                <span>申请价格：</span>
                <span class="num">￥2.0</span>
              </p>
              <ul>
                <li>
                  <span>公司名称：</span>
                  <span>北京聚多才科技有限公司</span>
                </li>
                <li>
                  <span>提交日期：</span>
                  <span>2019-05-10&nbsp;&nbsp;&nbsp;22:50</span>
                </li>
                <li>
                  <span>首批采购：</span>
                  <span>3000</span>
                  <span class="n">年采购量：</span>
                  <span>10000</span>
                </li>
                <li>
                  <span>竞争型号：</span>
                  <span>CDHDFJHKS-234J</span>
                </li>
                <li>
                  <span>备注说明：</span>
                  <span>请尽快回复，着急用这个型号</span>
                </li>
              </ul>
            </div>
            <div class="application-price-r price-r">
              <p>
                <span>申请有效期至：</span>
                <span>2019-05-10 12:00</span>
              </p>
              <!-- <span class="gq">已过期</span> -->
              <ul>
                <li>提醒原厂</li>
                <li>重新申请</li>
                <li>撤销请求</li>
              </ul>
            </div>
          </div>
          <div class="approved-price">
            <div class="approved-price-l price-l">
              <img src="@/assets/image/inquirybasket/u345.png" alt />
              <div>
                <p>
                  <span class="name">Nicky Wu</span>
                  <span class="yc">原厂商户</span>
                  <span class="rz">认证商户</span>
                </p>
                <p class="compy">罗彻斯特电子—销售经理</p>
                <p class="online">在线咨询</p>
              </div>
            </div>
            <div class="approved-price-m price-m">
              <p>
                <span>批复价格：</span>
                <span class="num">￥3.0-3.5</span>
              </p>
              <ul>
                <li>
                  <span>商户名称：</span>
                  <span>北京聚多才科技有限公司</span>
                </li>
                <li>
                  <span>回复日期：</span>
                  <span>2019-05-10&nbsp;&nbsp;&nbsp;22:50</span>
                </li>
                <li>
                  <span>MOQ：</span>
                  <span>3000</span>
                  <span>MOQ：</span>
                  <span>10000</span>
                </li>
                <li>
                  <span>交付周期：</span>
                  <span>2周</span>
                </li>
                <li>
                  <span>商家备注：</span>
                  <span>这个型号量不多，请尽快采购吧</span>
                </li>
              </ul>
              <div class="ladder-price">
                <LadderPrice>阶梯价格</LadderPrice>
              </div>
            </div>
            <div class="approved-price-r price-r">
              <div class="countdown">
                价格有效剩余期：
                <span>10</span>天
                <span>8</span>小时
                <span>25</span>分
              </div>
              <!-- <span class="gq">已过期</span> -->
              <ul>
                <li>立即采购</li>
                <li>发起拼购</li>
                <li>重新申请</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <p class="tit">
            <span class="serial-num">1</span>
            <span class="code">293D106X9035D2TE3</span>
            <span class="fr">申请编号：1912-1985261</span>
          </p>
          <div class="application-price">
            <div class="application-price-l price-l">
              <img src="@/assets/image/inquirybasket/_u11948.png" alt />
              <div>
                <router-link to="/BrandDetail/GoodsDetails" tag="p">
                  <span class="name">CDHDFJHKS-234J</span>
                </router-link>
                <router-link to="/BrandDetail" tag="p">
                  <span>品牌：</span>罗彻斯特电子
                </router-link>
                <p>
                  <span>型号描述：</span>
                  The 7721-7PPSG is an Insulating Shoulder Washer made of 40% glass filled polyphenylene sulfide (PPS) body. Its recommended .
                </p>
              </div>
            </div>
            <div class="application-price-m price-m">
              <p>
                <span>申请价格：</span>
                <span class="num">￥2.0</span>
              </p>
              <ul>
                <li>
                  <span>公司名称：</span>
                  <span>北京聚多才科技有限公司</span>
                </li>
                <li>
                  <span>提交日期：</span>
                  <span>2019-05-10&nbsp;&nbsp;&nbsp;22:50</span>
                </li>
                <li>
                  <span>首批采购：</span>
                  <span>3000</span>
                  <span class="n">年采购量：</span>
                  <span>10000</span>
                </li>
                <li>
                  <span>竞争型号：</span>
                  <span>CDHDFJHKS-234J</span>
                </li>
                <li>
                  <span>备注说明：</span>
                  <span>请尽快回复，着急用这个型号</span>
                </li>
              </ul>
            </div>
            <div class="application-price-r price-r">
              <p>
                <span>申请有效期至：</span>
                <span>2019-05-10 12:00</span>
              </p>
              <!-- <span class="gq">已过期</span> -->
              <ul>
                <li>提醒原厂</li>
                <li>重新申请</li>
                <li>撤销请求</li>
              </ul>
            </div>
          </div>
          <div class="approved-price">
            <div class="approved-price-l price-l">
              <img src="@/assets/image/inquirybasket/u345.png" alt />
              <div>
                <p>
                  <span class="name">Nicky Wu</span>
                  <span class="yc">原厂商户</span>
                  <span class="rz">认证商户</span>
                </p>
                <p class="compy">罗彻斯特电子—销售经理</p>
                <p class="online">在线咨询</p>
              </div>
            </div>
            <div class="approved-price-m price-m">
              <p>
                <span>批复价格：</span>
                <span class="num">￥3.0-3.5</span>
              </p>
              <ul>
                <li>
                  <span>商户名称：</span>
                  <span>北京聚多才科技有限公司</span>
                </li>
                <li>
                  <span>回复日期：</span>
                  <span>2019-05-10&nbsp;&nbsp;&nbsp;22:50</span>
                </li>
                <li>
                  <span>MOQ：</span>
                  <span>3000</span>
                  <span>MOQ：</span>
                  <span>10000</span>
                </li>
                <li>
                  <span>交付周期：</span>
                  <span>2周</span>
                </li>
                <li>
                  <span>商家备注：</span>
                  <span>这个型号量不多，请尽快采购吧</span>
                </li>
              </ul>
              <div class="ladder-price">
                <LadderPrice>阶梯价格</LadderPrice>
              </div>
            </div>
            <div class="approved-price-r price-r">
              <div class="countdown">
                价格有效剩余期：
                <span>10</span>天
                <span>8</span>小时
                <span>25</span>分
              </div>
              <!-- <span class="gq">已过期</span> -->
              <ul>
                <li>立即采购</li>
                <li>发起拼购</li>
                <li>重新申请</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <p class="tit">
            <span class="serial-num">1</span>
            <span class="code">293D106X9035D2TE3</span>
            <span class="fr">申请编号：1912-1985261</span>
          </p>
          <div class="application-price">
            <div class="application-price-l price-l">
              <img src="@/assets/image/inquirybasket/_u11948.png" alt />
              <div>
                <router-link to="/BrandDetail/GoodsDetails" tag="p">
                  <span class="name">CDHDFJHKS-234J</span>
                </router-link>
                <router-link to="/BrandDetail" tag="p">
                  <span>品牌：</span>罗彻斯特电子
                </router-link>
                <p>
                  <span>型号描述：</span>
                  The 7721-7PPSG is an Insulating Shoulder Washer made of 40% glass filled polyphenylene sulfide (PPS) body. Its recommended .
                </p>
              </div>
            </div>
            <div class="application-price-m price-m">
              <p>
                <span>申请价格：</span>
                <span class="num">￥2.0</span>
              </p>
              <ul>
                <li>
                  <span>公司名称：</span>
                  <span>北京聚多才科技有限公司</span>
                </li>
                <li>
                  <span>提交日期：</span>
                  <span>2019-05-10&nbsp;&nbsp;&nbsp;22:50</span>
                </li>
                <li>
                  <span>首批采购：</span>
                  <span>3000</span>
                  <span class="n">年采购量：</span>
                  <span>10000</span>
                </li>
                <li>
                  <span>竞争型号：</span>
                  <span>CDHDFJHKS-234J</span>
                </li>
                <li>
                  <span>备注说明：</span>
                  <span>请尽快回复，着急用这个型号</span>
                </li>
              </ul>
            </div>
            <div class="application-price-r price-r">
              <p>
                <span>申请有效期至：</span>
                <span>2019-05-10 12:00</span>
              </p>
              <!-- <span class="gq">已过期</span> -->
              <ul>
                <li>提醒原厂</li>
                <li>重新申请</li>
                <li>撤销请求</li>
              </ul>
            </div>
          </div>
          <div class="approved-price">
            <div class="approved-price-l price-l">
              <img src="@/assets/image/inquirybasket/u345.png" alt />
              <div>
                <p>
                  <span class="name">Nicky Wu</span>
                  <span class="yc">原厂商户</span>
                  <span class="rz">认证商户</span>
                </p>
                <p class="compy">罗彻斯特电子—销售经理</p>
                <p class="online">在线咨询</p>
              </div>
            </div>
            <div class="approved-price-m price-m">
              <p>
                <span>批复价格：</span>
                <span class="num">￥3.0-3.5</span>
              </p>
              <ul>
                <li>
                  <span>商户名称：</span>
                  <span>北京聚多才科技有限公司</span>
                </li>
                <li>
                  <span>回复日期：</span>
                  <span>2019-05-10&nbsp;&nbsp;&nbsp;22:50</span>
                </li>
                <li>
                  <span>MOQ：</span>
                  <span>3000</span>
                  <span>MOQ：</span>
                  <span>10000</span>
                </li>
                <li>
                  <span>交付周期：</span>
                  <span>2周</span>
                </li>
                <li>
                  <span>商家备注：</span>
                  <span>这个型号量不多，请尽快采购吧</span>
                </li>
              </ul>
              <div class="ladder-price">
                <LadderPrice>阶梯价格</LadderPrice>
              </div>
            </div>
            <div class="approved-price-r price-r">
              <div class="countdown">
                价格有效剩余期：
                <span>10</span>天
                <span>8</span>小时
                <span>25</span>分
              </div>
              <!-- <span class="gq">已过期</span> -->
              <ul>
                <li>立即采购</li>
                <li>发起拼购</li>
                <li>重新申请</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlreadyInquiry"
};
</script>

<style lang="less" scoped src="./AlreadyInquiry.less">
</style>
