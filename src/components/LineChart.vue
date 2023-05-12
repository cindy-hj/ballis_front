<template>
    <div>
        <canvas v-show="row.length > 0" ref="chart"></canvas>
        <div v-show="row.length === 0">체결된 거래가 아직 없습니다.</div>
        <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">체결 거래</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">판매 입찰</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">구매 입찰</button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                <ul class="info_head">
                    <li class="info_box">사이즈</li>
                    <li class="info_box">거래가</li>
                    <li class="info_box">거래일</li>
                </ul>
                <hr />
                <ul v-for="(tmp, i) in this.row.slice().reverse()" :key="i" class="info_body">
                    <li class="info_box" v-if="tmp.sellSize">{{ tmp.sellSize }}</li>
                    <li class="info_box" v-else>{{ tmp.buySize }}</li>
                    <li class="info_box">{{ tmp.price }}원</li>
                    <li class="info_box">{{ tmp.contractDate }}</li>
                </ul>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                <ul class="info_head">
                    <li class="info_box">사이즈</li>
                    <li class="info_box">판매 희망가</li>
                    <li class="info_box">수량</li>
                </ul>
                <hr />
                <ul v-for="(tmp, i) in this.sellRow" :key="i" class="info_body">
                    <li class="info_box">{{ tmp.productSize }}</li>
                    <li class="info_box">{{ tmp.wishPrice }}원</li>
                    <li class="info_box">{{ tmp.cnt }}</li>
                </ul>
            </div>

            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                <ul class="info_head">
                    <li class="info_box">사이즈</li>
                    <li class="info_box">구매 희망가</li>
                    <li class="info_box">수량</li>
                </ul>
                <hr />
                <ul v-for="(tmp, i) in this.buyRow" :key="i" class="info_body">
                    <li class="info_box">{{ tmp.productSize }}</li>
                    <li class="info_box">{{ tmp.wishPrice }}원</li>
                    <li class="info_box">{{ tmp.cnt }}</li>
                </ul> 
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default defineComponent({
    data() {
        return {
            buyRow:[],
            sellRow:[],
            row: [],
            sizes: [],
            prices: [],
            dates: [] 
        };
    },
    props: {
        productId: {
            type: Number,
            require: true
        }
    },
    methods: {
        handleDataBuy() {
            axios.get(`/api/get/buy/chart?productid=${this.productId}`).then((res)=>{
                this.buyRow = res.data;
                console.log("구매입찰 데이터", this.buyRow);
            })
        },

        handleDataSell() {
            axios.get(`/api/get/sell/chart?productid=${this.productId}`).then((res)=>{
                this.sellRow = res.data;
                console.log("판매입찰 데이터", this.sellRow);
            })
        },

        handleDataCon() {
            axios
                .get(`/api/get/contract/chart?productid=${this.productId}`)
                .then(res => {
                    this.row = res.data;
                    console.log("체결거래 데이터", this.row);
                    ////////////////////////////////// 차트 ///////////////////////////////////////
                    const chartPrices = [];
                    const chartDates = [];

                    this.row.forEach(item => {
                        if (!chartDates.includes(item.contractDate)) {
                        chartPrices.push(item.price);
                        chartDates.push(item.contractDate);
                        }
                    });

                    console.log('차트 가격', chartPrices);
                    console.log('차트 거래일', chartDates);
                    this.renderChart(chartPrices, chartDates);
                    
                    /////////////////////////////////// 체결거래 ///////////////////////////////////////
                    if(this.row.every(item => item.sellSize)) {
                        this.sizes = this.row.map(item => item.sellSize);
                    } else {
                        this.sizes = this.row.map(item => item.buySize);
                    }
                    this.prices = this.row.map(item => item.price);
                    this.dates = this.row.map(item => item.contractDate);

                })
                .catch(err => {
                    console.log(err);
                });
        },

        renderChart(chartPrices, chartDates) {
            const ctx = this.$refs.chart.getContext('2d');

            if (this.chart) {
                this.chart.destroy();
            }
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartDates,
                    datasets: [
                        {
                            // label: 'Price',
                            data: chartPrices,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    },

    mounted() {
        this.handleDataBuy();
        this.handleDataSell();
        this.handleDataCon();
        this.renderChart();
    }
});
</script>

<style lang="css" scoped>
.nav-link{
    margin: 10px;
}
.info_head{
    display: flex;
    margin-top: 15px;
}
.info_body{
    display: flex;
}
.info_box{
    margin-right: 10px;
    flex: 1;
}
ul{
    list-style: none;
    margin: 0;
}
</style>