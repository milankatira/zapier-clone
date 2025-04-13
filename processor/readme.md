### to run kafka locally using docker:
```bash
docker run -p 9092:9092 apache/kafka:3.7.1
```

### to enter the kafka container:
```bash
docker exec -it 6f7979006128 /bin/bash
```

### to create a topic:

```bash
cd  /opt/kafka/bin
```

```bash
./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
```


https://kafka.apache.org/quickstart