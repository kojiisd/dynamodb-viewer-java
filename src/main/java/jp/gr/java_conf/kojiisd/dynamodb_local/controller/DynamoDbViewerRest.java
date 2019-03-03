package jp.gr.java_conf.kojiisd.dynamodb_local.controller;

import com.amazonaws.services.dynamodbv2.model.DescribeTableResult;
import com.amazonaws.services.dynamodbv2.model.TableDescription;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jp.gr.java_conf.kojiisd.dynamodb_local.service.DynamoDbViewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @author kojiisd
 */
@RestController
@RequestMapping(value = "/api")
public class DynamoDbViewerRest {

    @Autowired
    private DynamoDbViewerService viewerService;

    @RequestMapping(value = "list-tables")
    public List<String> listTables() {
        return this.viewerService.getAllTables();
    }

    @RequestMapping(value = "scan/{tableName}")
    public List<Map<String, String>> scanTable(@PathVariable("tableName") String tableName) {
        return this.viewerService.scanTableByTableName(tableName);
    }

    @RequestMapping(value = "inquiry/{tableName}")
    public String inquiryTable(@PathVariable("tableName") String tableName) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        TableDescription tableDescription = viewerService.inquiryTableByTableName(tableName);
        String jsonResult = mapper.writeValueAsString(tableDescription);
        return jsonResult;
    }

    @RequestMapping(value = "delete/{tableName}")
    public void deleteTable(@PathVariable("tableName") String tableName) throws InterruptedException {
        this.viewerService.deleteTableByTableName(tableName);
    }

    @RequestMapping(value = "drop/{tableName}")
    public void dropTable(@PathVariable("tableName") String tableName) {
        this.viewerService.dropTableByTableName(tableName);
    }
}
