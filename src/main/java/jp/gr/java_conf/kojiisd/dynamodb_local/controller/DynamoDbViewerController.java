package jp.gr.java_conf.kojiisd.dynamodb_local.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author kojiisd
 */
@Controller
public class DynamoDbViewerController {

    @RequestMapping(value = {"/", ""}, method = RequestMethod.GET)
    public String index() {
        return "/index";
    }

    @RequestMapping(value = "/scan/{tableName}", method = RequestMethod.GET)
    public String inquiry(@PathVariable("tableName") String tableName, Model model) {
        model.addAttribute("tableName", tableName);
        return "/read/scan";
    }

    @RequestMapping(value = "/query/{tableName}", method = RequestMethod.GET)
    public String query(@PathVariable("tableName") String tableName, Model model) {
        model.addAttribute("tableName", tableName);
        return "/read/query";
    }
}
