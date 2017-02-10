app.component('stream', {
    templateUrl: '/javascripts/components/stream/stream.html',
    controller: function(twitterService, $log, $timeout, $scope, $interval, $state) {

      this.tweetText = twitterService.tweetText;
      this.tweetScores = twitterService.tweetScores;
      this.tweetTimes = twitterService.tweetTimes;
      this.filteredResponse = twitterService.filteredResponse;

      //line chart
      this.chartConfig = {
          options: {
              chart: {
                  type: 'area'
              }
          },

          title: {
              text: 'Sentiment Analysis'
          },
          yAxis: {
              min: -15,
              max: 15,
              title: {
                  text: 'Sentiment Score'
              }
          },
          xAxis: {
              title: {
                  text: 'Time'
              },
              categories: this.tweetText,
              labels: {
                enabled: false
              },
              type: 'datetime',
              minTickInterval: 100,
              minRange: 0,
              maxRange: 100 * 5
          },
          legend: {
            enabled: false
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: false
                  },
                  enableMouseTracking: true
              }
          },
          series: [
              {
                  zones: [{
                    value: 0,
                    color: '#ED4337'
                  }],
                  name: 'Sentiment Score',
                  data: this.tweetScores
              }
          ]
      }; // End of chartconfig1

      this.poll = () => {
          $timeout(() => {
              console.log('polling twitter service')
              twitterService.getUpdate();


              // Here is where you could poll a REST API or the websockets service for live data
              // this.chartConfig.series[0].data.shift();
              // this.chartConfig.series[0].data.push(Math.floor(Math.random() * 20) + 1);
              this.poll();
          }, 5000);
      };

      this.$onInit = () => {
          $log.log("hello");
          twitterService.initialPieChart();
          $timeout(() => {
            this.poll();
          }, 500);
      }; // End of chartConfig

      // this.stopPoll = () => {
      //
      // }

      this.chartConfig2 = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Sentiment Share'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Sentiment',
                colorByPoint: true,
                data: [{
                    name: 'Positive',
                    y: twitterService.positivePercentage
                }, {
                    name: 'Negative',
                    color: '#ED4337',
                    y: twitterService.negativePercentage,
                    sliced: true,
                    selected: true
                }]
            }]
      };

  } // End of controller
}); // End of component
