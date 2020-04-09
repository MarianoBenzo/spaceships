class UniverseStatistics {
  statistics: Statistics[];

  constructor(universeStatistics: any) {
    this.statistics = universeStatistics.map(
      statistics => new Statistics(statistics)
    );
  }
}

class Statistics {
  text: string;
  value: string;

  constructor(statistics: any) {
    this.text = statistics.text;
    this.value = statistics.value;
  }
}

export default UniverseStatistics;
