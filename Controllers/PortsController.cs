using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PortsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<PortsController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Ports.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<PortsController>/5
        [HttpGet("{id}", Name = "GetPort")]
        public ActionResult Get(string id)
        {
            try
            {
                var port = _context.Ports.First(ct => ct.PortId == id);
                return Ok(port);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<PortsController>
        [HttpPost("{prefix?}")]
        public ActionResult Post([FromBody] Port port, [FromRoute] string prefix = "CT")
        {
            try
            {
                var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);
                port.PortId = consecutive.GetConsecutiveCode();
                _context.Ports.Add(port);
                _context.SaveChanges();
                return CreatedAtRoute("GetPort", new { id = port.PortId }, port);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<PortsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Port port)
        {
            try
            {
                if (port.PortId == id)
                {
                    _context.Entry(port).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetPort", new { id = port.PortId }, port);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<PortsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var port = _context.Ports.First(ct => ct.PortId == id);
                if (port != null)
                {
                    _context.Ports.Remove(port);
                    _context.SaveChanges();
                    return Ok(port);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
